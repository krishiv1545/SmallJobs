from django.db import models
from django.conf import settings


class HangOut_Room(models.Model):
    room_name = models.CharField(max_length=100)
    room_token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        db_table = 'HangOut_Room'


class Message(models.Model):
    room = models.ForeignKey(HangOut_Room, on_delete=models.CASCADE, related_name='messages')
    sender_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'HangOut_Message'
        ordering = ['timestamp']