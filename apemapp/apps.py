from django.apps import AppConfig


class ApemappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apemapp'
    
    def ready(self):
        import apemapp.signals