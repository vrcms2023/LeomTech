from django.db import models
import uuid
from common.BaseModel import ImageModel
# Create your models here.

class BannerAndIntro(ImageModel):
    pageType =      models.CharField(max_length=100, null=False)
    bannerTitle =   models.CharField(max_length=100, null=False)
  
  