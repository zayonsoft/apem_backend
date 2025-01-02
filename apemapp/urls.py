from django.urls import path
from apemapp import views, views2

urlpatterns = [
    path("", views.landing, name = "landing"),
    path("home", views.home, name = "home"),
    path("staff", views.auth, name = "auth"),
    path("login", views2.postLogin, name = "login"),
    
    path("password", views.password, name = "password"),
    path("change_password", views2.changePassword, name = "change_password"),
    
    path("logout", views.logout, name = "logout"),
    
    path("accounts", views.accounts, name = "accounts"),
    path("get_accounts", views2.getAccounts, name = "get_accounts"),
    path("create_account", views2.createAccount, name = "create_account"),
    path("edit_account", views2.editAccount, name = "edit_account"),
    path("delete_account", views2.deleteAccount, name = "delete_account"),
    
    
    path("get_sermons", views2.getSermons, name = "get_sermons"),
    path("create_sermons", views2.createSermon, name = "create_sermon"),
    path("edit_sermon", views2.editSermon, name = "edit_sermon"),
    path("delete_sermon", views2.deleteSermon, name = "delete_sermon"),
    
    path("sermons", views.sermons, name = "sermons"),
]
