from django.db import models
from common.BaseModel import ImageModel
# Create your models here.

class AppNews(ImageModel):
    newstitle =     models.CharField(max_length=500, null=True, blank=True)

  
