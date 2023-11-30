from django.db import models
import uuid

# Create your models here.

class BannerAndIntro(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    pageType =      models.CharField(max_length=100, null=False)
    imageUrl =      models.CharField(max_length=100, null=True, blank=True)
    imageId =       models.CharField(max_length=100, null=True, blank=True)
    originalname=   models.CharField(max_length=100, null=True, blank=True)
    alt_text =      models.CharField(max_length=500, null=True, blank=True)
    intro_title =   models.CharField(max_length=500, null=True, blank=True)
    into_description =   models.CharField(max_length=5000, null=True, blank=True)
    created_by =    models.CharField(max_length=50, null=False)
    updated_By =    models.CharField(max_length=50, null=False)
    created_at =    models.DateTimeField(auto_now_add=True)
    updated_at =    models.DateTimeField(auto_now=True)
  