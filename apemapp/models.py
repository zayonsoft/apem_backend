from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    profile_code = models.CharField(unique= True, max_length=500)
    user = models.OneToOneField(User, on_delete = models.CASCADE, blank = True, null = True)
    is_admin = models.BooleanField(default = False)
    
    def __str__(self):
        if self.profile_code:
            return self.profile_code
        else:
            return "Unamed Profile"
            


class BankAccount(models.Model):
    account_name = models.CharField(max_length= 500)
    account_number = models.CharField(max_length = 200)
    bank_name = models.CharField(max_length= 1000)


class Sermon(models.Model):
    title = models.CharField(max_length=500)
    body = models.TextField()
    poster = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    date_posted = models.DateTimeField(auto_now_add=True)
    
    