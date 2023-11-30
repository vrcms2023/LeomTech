from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Carousel)
class AddCarousel(admin.ModelAdmin):
    list_display =("carousel_title", "description")


@admin.register(HomeIntro)
class AddHomeIntro(admin.ModelAdmin):
    list_display =("intro_title", "intro_desc")