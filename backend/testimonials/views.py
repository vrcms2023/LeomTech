from .models import Testimonials
from .serializers import TestimonialsSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from common.utility import get_testimonial_data_From_request_Object 

# Create your views here.
    
class CreateTestimonials(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer

    """
    List all Testimonials, or create a new Testimonials.
    """

    def get(self, request, format=None):
        snippets = Testimonials.objects.all()
        serializer = TestimonialsSerializer(snippets, many=True)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        requestObj = get_testimonial_data_From_request_Object(request)
        requestObj['created_by'] = request.data["created_by"]
        serializer = TestimonialsSerializer(data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"testimonial": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TestimonialsDetail(APIView):
    """
    Retrieve, update or delete a Testimonials instance.
    """
    def get_object(self, pk):
        try:
            return Testimonials.objects.get(pk=pk)
        except Testimonials.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = TestimonialsSerializer(snippet)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        snippet = self.get_object(pk)
        requestObj = get_testimonial_data_From_request_Object(request)
        requestObj['updated_by'] = request.data["updated_by"]
        serializer = TestimonialsSerializer(snippet, data=requestObj)
        if serializer.is_valid():
            serializer.save()
            return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


   
class ClientTestimonials(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Testimonials.objects.all()
    serializer_class = TestimonialsSerializer

    """
    List all Testimonials, or create a new Testimonials.
    """

    def get(self, request, format=None):
        snippets = Testimonials.objects.all()
        serializer = TestimonialsSerializer(snippets, many=True)
        return Response({"testimonial": serializer.data}, status=status.HTTP_200_OK)

