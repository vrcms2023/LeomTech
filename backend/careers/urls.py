from django.urls import path
from .views import *


urlpatterns = [
    path('createCareer/', CreateCareer.as_view(), name="create_get_CreateCareer"),
    path('updateCareer/<pk>/', UpdateCareersDetail.as_view(), name='retrieve_update_delete_career'),
    path('publishService/<pk>/', PublishCareerAPIView.as_view(), name="publishCareer"),
    path('clientServiceList/', ClientCareerAPIView.as_view(), name="get_client_CareerList")
 ]
