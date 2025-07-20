# SmallJobsHome/urls.py
from django.urls import path, include

urlpatterns = [
    path('', include('SmallJobsHome.web_pages.home.home_urls')),
]
