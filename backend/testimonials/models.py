from django.db import models
import uuid
import os
from common.BaseModel import ImageModel, BaseModel

# Create your models here.

class Testimonials(ImageModel): 
    testimonialTitle =         models.CharField(max_length=500, null=True, blank=True)

