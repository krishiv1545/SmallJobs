# SmallJobsHome/web_pages/auth/auth.py
from django.urls import path
from django.http import JsonResponse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from SmallJobsHome.models import SmallJobsUser
import json
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token


@csrf_exempt
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        fullname = data.get("fullname")
        email = data.get("email")
        password = data.get("password")

        if SmallJobsUser.objects.filter(email=email).exists():
            return JsonResponse({"error": "Email already exists"}, status=400)

        user = SmallJobsUser.objects.create_user(
            fullname=fullname, email=email, password=password
        )
        
        # Auto-login after signup
        auth_login(request, user)
        
        return JsonResponse({
            "message": "User created successfully!",
            "user": {
                "fullname": user.fullname,
                "email": user.email,
                "user_type": user.user_type,
            }
        }, status=201)


@csrf_exempt
def login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        print(f"=== LOGIN attempt for {email} ===")
        user = authenticate(email=email, password=password)
        if user is not None:
            print("=== User Authenticated ===")
            auth_login(request, user)
            print(f"Session ID after login: {request.session.session_key}")
            print(f"User authenticated after login: {request.user.is_authenticated}")
            return JsonResponse({
                "message": "Login successful",
                "user": {
                    "fullname": user.fullname,
                    "email": user.email,
                    "user_type": user.user_type,
                }
            })
        else:
            print("=== User Not Authenticated ===")
            return JsonResponse({"error": "Invalid credentials"}, status=401)
        

@csrf_exempt
def logout(request):
    if request.method == "POST":
        if request.user.is_authenticated:
            auth_logout(request)
            return JsonResponse({"message": "Logout successful"})
        else:
            return JsonResponse({"error": "User not logged in"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def me(request):
    print(f"=== ME endpoint called ===")
    print(f"User authenticated: {request.user.is_authenticated}")
    print(f"User: {request.user}")
    print(f"Session ID: {request.session.session_key}")
    print(f"Cookies: {request.COOKIES}")
    
    if request.user.is_authenticated:
        user = request.user
        return JsonResponse({
            "fullname": user.fullname,
            "email": user.email,
            "user_type": user.user_type,
        })
    else:
        return JsonResponse({"error": "Not logged in"}, status=401)


@csrf_exempt
def csrf_token(request):
    """Get CSRF token for frontend"""
    return JsonResponse({"csrfToken": get_token(request)})
