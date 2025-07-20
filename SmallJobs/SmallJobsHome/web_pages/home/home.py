# SmallJobsHome/web_pages/home/home.py
from django.shortcuts import render


def home(request):
    return render(request, "home/home.html")