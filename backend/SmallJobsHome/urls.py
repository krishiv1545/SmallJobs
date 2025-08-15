# SmallJobsHome/urls.py
from django.urls import path, include

urlpatterns = [
    path('', include('SmallJobsHome.web_pages.home.home_urls')),
    path('catalog/', include('SmallJobsHome.web_pages.catalog.catalog_urls')),
    path('auth/', include('SmallJobsHome.web_pages.auth.auth_urls')),
]
