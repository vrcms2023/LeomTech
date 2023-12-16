from django.db import models
import uuid
from common.BaseModel import BaseModel


# Create your models here.

class Address(BaseModel):
        address_dr_no =     models.CharField(max_length=50, null=False )
        location =          models.CharField(max_length=100, null=False )
        street =            models.CharField(max_length=100, null=False )
        city =              models.CharField(max_length=100, null=False )
        state =             models.CharField(max_length=100, null=False )
        postcode =          models.CharField(max_length=100, null=False )
        emailid =           models.CharField(max_length=100, null=False )
        phonen_number =     models.CharField(max_length=100, null=False )
        phonen_number_2 =   models.CharField(max_length=100, null=False )
        twitter_url =       models.CharField(max_length=500, null=True, blank=True )
        facebook_url =      models.CharField(max_length=500, null=True, blank=True )
        linkedIn_url =      models.CharField(max_length=500, null=True, blank=True )
        youtube_url =       models.CharField(max_length=500, null=True, blank=True )
        instagram_url =     models.CharField(max_length=500, null=True, blank=True )
        vimeo_url =         models.CharField(max_length=500, null=True, blank=True )
        pinterest_url =     models.CharField(max_length=500, null=True, blank=True )
 

class TermsandCondition(BaseModel):
        terms_condition =   models.CharField(max_length=5000, null=True, blank=True )
        privacy_policy =    models.CharField(max_length=5000, null=True, blank=True )

class googleMAPURL(BaseModel):
        google_map_url =   models.CharField(max_length=5000, null=True, blank=True )
      