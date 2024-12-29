from django.shortcuts import render, redirect
from apemapp.decorators import authenticated_user ,unauthenticated_user

from django.contrib import auth

# Create your views here.

def landing(request):
    return render(request, "main/index.html")


@unauthenticated_user
def auth(request):
    return render(request, "auth/auth.html")

@authenticated_user
def home(request):
    return render(request, "components/home.html")


@authenticated_user
def sermons(request):
    return render(request, "components/posts.html")


@authenticated_user
def accounts(request):
    return render(request, "components/accounts.html")


def logout(request):
    auth.logout(request)
    return redirect("auth")