from django.db import models
import uuid


# Create your models here.

class Address(models.Model):
        id = models.UUIDField(primary_key=True, default = uuid.uuid4, unique=True, editable=False)
        address_dr_no =     models.CharField(max_length=50, null=False )
        location =          models.CharField(max_length=100, null=False )
        street =            models.CharField(max_length=100, null=False )
        city =              models.CharField(max_length=100, null=False )
        state =             models.CharField(max_length=100, null=False )
        postcode =          models.CharField(max_length=100, null=False )
        emaiid =            models.CharField(max_length=100, null=False )
        phonen_umber =      models.CharField(max_length=100, null=False )
        terms_condition =   models.CharField(max_length=5000, null=True, blank=True )
        privacy_policy =    models.CharField(max_length=5000, null=True, blank=True )
        twitter_url =       models.CharField(max_length=500, null=True, blank=True )
        facebook_url =      models.CharField(max_length=500, null=True, blank=True )
        youtube_url =       models.CharField(max_length=500, null=True, blank=True )
        instagram_url =     models.CharField(max_length=500, null=True, blank=True )
        vimeo_url =         models.CharField(max_length=500, null=True, blank=True )
        linkedIn_url =      models.CharField(max_length=500, null=True, blank=True )
        pinterest_url =     models.CharField(max_length=500, null=True, blank=True )
        created_by =        models.CharField(max_length=50)
        updated_By =        models.CharField(max_length=50)
        created_at =        models.DateTimeField(auto_now_add=True)
        updated_at =        models.DateTimeField(auto_now=True)

