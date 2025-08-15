# HangOut/urls.py
from django.urls import path, include

urlpatterns = [
    path('', include('HangOut.web_pages.home.home_urls')),
]
