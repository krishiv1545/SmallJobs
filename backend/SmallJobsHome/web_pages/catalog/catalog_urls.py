# SmallJobsHome/web_pages/catalog/catalog_urls.py
from django.urls import path
from .catalog import catalog_view

urlpatterns = [
    path('', catalog_view, name='catalog'),
]