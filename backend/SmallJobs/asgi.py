"""
ASGI config for SmallJobs project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "SmallJobs.settings")

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack


django_asgi_app = get_asgi_application()

# Import after apps are loaded to avoid AppRegistryNotReady
from HangOut.web_pages.room import room_urls

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            room_urls.websocket_urlpatterns
        )
    ),
})
