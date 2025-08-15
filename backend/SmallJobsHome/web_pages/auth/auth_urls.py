# SmallJobsHome/web_pages/auth/auth_urls.py
from django.urls import path
from .auth import signup, login, logout, me, csrf_token

urlpatterns = [
    path('signup', signup, name='signup'),
    path('login', login, name='login'),
    path("logout", logout, name="logout"),
    path("me", me, name="me"),
    path("csrf", csrf_token, name="csrf_token"),
]