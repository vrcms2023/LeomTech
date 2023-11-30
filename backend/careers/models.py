from django.db import models
import uuid


# Create your models here.

class Careers(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        job_title =         models.CharField(max_length=100, null=False )
        job_location =      models.CharField(max_length=100, null=True, blank=True )
        experience =        models.CharField(max_length=100, null=True, blank=True )
        education =         models.CharField(max_length=100, null=True, blank=True )
        openings =          models.IntegerField(null=True, blank=True)
        posted_date =       models.DateTimeField(auto_now_add=True)
        description =       models.JSONField(null=True, blank=True)
        publish =           models.BooleanField(default=False)
        created_by =        models.CharField(max_length=50)
        updated_By =        models.CharField(max_length=50)
        created_at =        models.DateTimeField(auto_now_add=True)
        updated_at =        models.DateTimeField(auto_now=True)