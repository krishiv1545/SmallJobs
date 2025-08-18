import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from HangOut.models import HangOut_Room, Message


@require_GET
def validate_room(request, room_token):
    exists = HangOut_Room.objects.filter(room_token=room_token).exists()
    if exists:
        return JsonResponse({"exists": True})
    print("Room not found :3")
    return JsonResponse({"exists": False}, status=404)


class RoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_token = self.scope["url_route"]["kwargs"]["room_token"]
        self.room_group_name = f"chat_{self.room_token}"

        # Require authentication
        user = self.scope.get("user")
        if not user or isinstance(user, AnonymousUser) or not user.is_authenticated:
            await self.close()
            return
        self.user = user

        # Resolve room or close if not found (do not auto-create)
        room = await self.get_room()
        if room is None:
            await self.close()
            return
        self.room = room

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        await self.send(text_data=json.dumps({
            "type": "connection_established",
            "channel_name": self.channel_name,
            "user_id": self.user.id,
        }))

        # Send chat history (last 50)
        history = await self.get_history()
        if history:
            await self.send(text_data=json.dumps({
                "type": "chat_history",
                "messages": history,
            }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = (data.get("message") or "").strip()
        if not message:
            return

        # Persist
        await self.save_message(self.user.id, message)

        # Broadcast
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender_id": self.user.id,
                "sender_channel_name": self.channel_name,
            },
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "chat_message",
            "message": event["message"],
            "sender_id": event.get("sender_id"),
            "sender_channel_name": event.get("sender_channel_name"),
        }))

    @database_sync_to_async
    def get_room(self):
        return HangOut_Room.objects.filter(room_token=self.room_token).first()

    @database_sync_to_async
    def save_message(self, sender_user_id: int, content: str):
        Message.objects.create(room=self.room, sender_user_id=sender_user_id, content=content)

    @database_sync_to_async
    def get_history(self):
        msgs = Message.objects.filter(room=self.room).order_by("-timestamp")[:50]
        msgs = list(reversed(list(msgs)))
        return [
            {
                "sender_id": m.sender_user_id,
                "message": m.content,
                "timestamp": m.timestamp.isoformat(),
            }
            for m in msgs
        ]
