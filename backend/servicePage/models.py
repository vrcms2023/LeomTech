from django.db import models
import uuid
from common.BaseModel import BaseModel, ServiceImageModel


# Create your models here.

class Services(BaseModel):
        services_page_title =   models.CharField(max_length=100, unique=True )
        publish =               models.BooleanField(default=False)

class ServiceFeature(ServiceImageModel):
        serviceID  =            models.CharField(max_length=100, null=False)
        feature_title =         models.CharField(max_length=100 )
        feature_sub_title=      models.CharField(max_length=200, null=True, blank=True)
        feature_description =   models.CharField(max_length=10000, null=True, blank=True)
       

class ServiceAccordion(ServiceImageModel):
        serviceID  =            models.CharField(max_length=100, null=False)
        accordion_title =       models.CharField(max_length=100 )
        accordion_sub_title=    models.CharField(max_length=200, null=True, blank=True)
        accordion_description = models.CharField(max_length=10000, null=True, blank=True)
