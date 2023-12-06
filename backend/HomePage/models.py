from django.db import models
import uuid

class Carousel(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    imageUrl =      models.CharField(max_length=100, null=True, blank=True)
    imageId =       models.CharField(max_length=100, null=True, blank=True)
    originalname=   models.CharField(max_length=100, null=True, blank=True)
    carousel_title =models.CharField(max_length=500, null=True, blank=True)
    description =   models.CharField(max_length=5000, null=True, blank=True)
    alt_text =      models.CharField(max_length=500, null=True, blank=True)
    created_by =    models.CharField(max_length=50, null=False)
    updated_By =    models.CharField(max_length=50, null=False)
    created_at =    models.DateTimeField(auto_now_add=True)
    updated_at =    models.DateTimeField(auto_now=True)

class HomeIntro(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    intro_title =   models.CharField(max_length=100, null=True, blank=True)
    intro_desc =    models.CharField(max_length=100, null=True, blank=True)
    intro_morelink = models.CharField(max_length=100, null=True, blank=True)
    subTitle =      models.JSONField(null=True, blank=True)
    created_by =    models.CharField(max_length=50, null=False)
    updated_By =    models.CharField(max_length=50, null=False)
    created_at =    models.DateTimeField(auto_now_add=True)
    updated_at =    models.DateTimeField(auto_now=True)

class ClientLogo(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    imageUrl =      models.CharField(max_length=100, null=True, blank=True)
    imageId =       models.CharField(max_length=100, null=True, blank=True)
    originalname=   models.CharField(max_length=100, null=True, blank=True)
    alt_text =      models.CharField(max_length=500, null=True, blank=True)
    created_by =    models.CharField(max_length=50, null=False)
    updated_By =    models.CharField(max_length=50, null=False)
    created_at =    models.DateTimeField(auto_now_add=True)
    updated_at =    models.DateTimeField(auto_now=True)