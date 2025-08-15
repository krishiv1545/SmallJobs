# HangOut/web_pages/home/home_urls.py
from django.urls import path
from .home import home, create_room, delete_room


urlpatterns = [
    path('', home, name='home'),
    path('home/', home, name='home_alias'),
    path('create-room/', create_room, name='create_room'),
    path('delete-room/', delete_room, name='delete_room'),
]