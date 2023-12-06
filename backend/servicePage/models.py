from django.db import models
import uuid


# Create your models here.

class Services(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        services_page_title =   models.CharField(max_length=100 )
        publish =               models.BooleanField(default=False)
        created_by =            models.CharField(max_length=50)
        updated_By =            models.CharField(max_length=50)
        created_at =            models.DateTimeField(auto_now_add=True)
        updated_at =            models.DateTimeField(auto_now=True)

class ServiceFeature(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        serviceID  =            models.CharField(max_length=100, null=False)
        feature_title =         models.CharField(max_length=100 )
        feature_sub_title=      models.CharField(max_length=200, null=True, blank=True)
        feature_description =   models.JSONField(null=True, blank=True)
        imageUrl =              models.CharField(max_length=100, null=True, blank=True)
        imageId =               models.CharField(max_length=100, null=True, blank=True)
        originalname=           models.CharField(max_length=100, null=True, blank=True)
        created_by =            models.CharField(max_length=50)
        updated_By =            models.CharField(max_length=50)
        created_at =            models.DateTimeField(auto_now_add=True)
        updated_at =            models.DateTimeField(auto_now=True)

class ServiceAccordion(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        serviceID  =            models.CharField(max_length=100, null=False)
        accordion_title =       models.CharField(max_length=100 )
        accordion_sub_title=    models.CharField(max_length=200, null=True, blank=True)
        accordion_description = models.JSONField(null=True, blank=True)
        created_by =            models.CharField(max_length=50)
        updated_By =            models.CharField(max_length=50)
        created_at =            models.DateTimeField(auto_now_add=True)
        updated_at =            models.DateTimeField(auto_now=True)