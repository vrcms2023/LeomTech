from django.db import models
import os
from django.utils import timezone
import uuid


class BaseModel(models.Model):
    id =            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    created_by =    models.CharField(max_length=50, null=True, blank=True)
    updated_by =    models.CharField(max_length=50, null=True, blank=True)
    created_at =    models.DateTimeField(auto_now= True)
    updated_at =    models.DateTimeField(auto_now_add= True)

    class Meta:
        abstract = True 



def image_upload_path(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"images/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"


class ImageModel(BaseModel):
    path =          models.FileField(blank=True, null=True, upload_to=image_upload_path )
    category =      models.CharField(max_length=100, null=True, )
    originalname=   models.CharField(max_length=100, null=True, blank=True)
    contentType=    models.CharField(max_length=100, null=True, blank=True)
    imageTitle =    models.CharField(max_length=500, null=True)
    imageDescription = models.CharField(max_length=5000, null=True)
    alternitivetext = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        abstract = True 