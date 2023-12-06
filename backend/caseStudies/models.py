from django.db import models
import uuid
from django.utils import timezone

# Create your models here.

class CaseStudies(models.Model):
    id =                            models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
    imageUrls =                     models.JSONField(null=True, blank=True)
    imageIds =                      models.JSONField(null=True, blank=True)
    originalnames=                  models.JSONField(null=True, blank=True)
    alt_text =                      models.CharField(max_length=500, null=True, blank=True)
    case_studies_title =            models.CharField(max_length=500, null=True, blank=True)
    case_studies_description =      models.JSONField(null=True, blank=True)
    created_by =                    models.CharField(max_length=50, null=False)
    updated_By =                    models.CharField(max_length=50, null=False)
    created_at =                    models.DateTimeField(auto_now_add=True)
    updated_at =                    models.DateTimeField(auto_now=True)