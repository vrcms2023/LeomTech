from django.db import models
import uuid
from common.BaseModel import ImageModel
# Create your models here.

class BannerAndIntro(ImageModel):
    pageType =      models.CharField(max_length=100, null=False)
    banner_title =   models.CharField(max_length=100, null=False)
    banner_subTitle =   models.CharField(max_length=100, null=False)
    banner_descripiton =   models.CharField(max_length=5000, null=False)
  
  