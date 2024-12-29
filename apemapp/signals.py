from django.db.models.signals import post_save
from django.contrib.auth.models import User
from apemapp.models import Profile

def createProfile(sender, instance, created, **kwargs):
    if created:
        created_user = instance
        
        if not Profile.objects.filter(user = created_user).exists():
            if created_user.is_superuser:
                Profile.objects.create(profile_code = created_user.username, user = created_user, is_admin = True)
            else:
                Profile.objects.create(profile_code = created_user.username, user = created_user, is_admin = False)
            
            print("Profile Created")
            
post_save.connect(createProfile, sender=User)



# Creates a user account with a password and username
def createUser(sender, instance, created, **kwargs):
    if created:
        created_profile = instance
        
        if not User.objects.filter(username = created_profile.profile_code).exists():
            User.objects.create_user(username = created_profile.profile_code, password = created_profile.profile_code)
            

post_save.connect(createUser, sender= Profile)