from django.shortcuts import render, redirect
from apemapp.decorators import authenticated_user ,unauthenticated_user, admins_only
from django.contrib.auth.models import User

from django.contrib import auth as login_auth

# Create your views here.

def landing(request):
    return render(request, "main/index.html")


@unauthenticated_user
def auth(request):
    return render(request, "auth/auth.html")

@authenticated_user
@admins_only
def home(request):
    return render(request, "components/home.html")


@authenticated_user
@admins_only
def sermons(request):
    return render(request, "components/posts.html")


@authenticated_user
@admins_only
def accounts(request):
    return render(request, "components/accounts.html")


def logout(request):
    login_auth.logout(request)
    return redirect("auth")

@authenticated_user
def password(request):
    return render(request, "components/password.html")