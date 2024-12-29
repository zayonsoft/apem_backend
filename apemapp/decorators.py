from django.http import JsonResponse
from django.urls import reverse

from django.shortcuts import redirect

# from apemapp.models import 

def authenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            return redirect("auth")
    
    return wrapper_func


def async_authenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            data ={"message":"You Cannot access this Function, You need to be logged in", "success":False}
            return JsonResponse(data)
    
    return wrapper_func


def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            return redirect("home")
    
    return wrapper_func


def async_unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return view_func(request, *args, **kwargs)
        else:
            data ={"message":"You Are Already Logged in<br />Redirecting..", "success":False, "refresh":True, "next_url": reverse("home")}
            return JsonResponse(data)
    
    return wrapper_func


def admins_only(view_func):
    def wrapper_func(request, *args, **kwargs):
        if not request.user.profile.is_admin:
            return redirect("home")
        else:
            return view_func(request, *args, **kwargs)
    return wrapper_func

