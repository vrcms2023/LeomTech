from django.db import models
import uuid
from common.BaseModel import ImageModel, BaseModel

class Carousel(ImageModel):
    carouse_title =          models.CharField(max_length=200, null=True)
    carouse_sub_title =          models.CharField(max_length=200, null=True)
    carouse_description =    models.CharField(max_length=5000, null=True)


class HomeIntro(BaseModel):
    intro_title =   models.CharField(max_length=100, null=True, blank=True)
    intro_desc =    models.CharField(max_length=5000, null=True, blank=True)
    intro_morelink = models.CharField(max_length=100, null=True, blank=True)
    subTitle =      models.JSONField(null=True, blank=True)
    pageType =      models.CharField(max_length=100, null=False)
   

class ClientLogo(BaseModel):
    clientTitle =    models.CharField(max_length=500, null=True)
    imageDescription = models.CharField(max_length=5000, null=True)
    alt_text =      models.CharField(max_length=500, null=True, blank=True)