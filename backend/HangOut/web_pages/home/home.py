# HangOut/web_pages/home/home.py
from django.shortcuts import render
from HangOut.models import HangOut_Room
from django.http import JsonResponse
import json
import uuid
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def home(request):
	if not request.user.is_authenticated:
		return JsonResponse({'rooms': []})
	rooms = list(
		HangOut_Room.objects.filter(created_by=request.user)
		.values('room_name', 'room_token', 'created_at')
	)
	return JsonResponse({'rooms': rooms})


# Remove redirect behavior and return 401 for unauthenticated requests
@csrf_exempt
def create_room(request):

	if request.method != "POST":
		return JsonResponse({"error": "POST method required"}, status=405)

	if not request.user.is_authenticated:
		return JsonResponse({"error": "Login required"}, status=401)

	data = json.loads(request.body)
	print(data)
	room_name = data.get("room_name")
	if not room_name:
		return JsonResponse({"error": "room_name is required"}, status=400)

	token = str(uuid.uuid4())

	room = HangOut_Room.objects.create(
		room_name=room_name,
		room_token=token,
		created_by=request.user
	)

	return JsonResponse({
		"room_name": room.room_name,
		"room_token": room.room_token,
		"created_by": room.created_by.email,
	})


@csrf_exempt
def delete_room(request):
	if request.method != "POST":
		return JsonResponse({"error": "POST method required"}, status=405)

	if not request.user.is_authenticated:
		return JsonResponse({"error": "Login required"}, status=401)

	try:
		data = json.loads(request.body)
		room_token = data.get("room_token")
		if not room_token:
			return JsonResponse({"error": "room_token is required"}, status=400)

		room = HangOut_Room.objects.get(room_token=room_token, created_by=request.user)
		room.delete()
		return JsonResponse({"message": "Room deleted"})
	except HangOut_Room.DoesNotExist:
		return JsonResponse({"error": "Room not found"}, status=404)
	except json.JSONDecodeError:
		return JsonResponse({"error": "Invalid JSON"}, status=400)