from django.urls import path, re_path
from .room import RoomConsumer, validate_room

# Normal Django views
urlpatterns = [
    path('validate/<str:room_token>/', validate_room, name='validate_room'),
]

# WebSocket routes
websocket_urlpatterns = [
    re_path(r"^ws/room/(?P<room_token>[0-9a-f-]+)/$", RoomConsumer.as_asgi()), # FUCK REGEX
]
