# SmallJobsHome/web_pages/home/home_urls.py
from django.urls import path
from .home import home

urlpatterns = [
    path('', home, name='home'),
]