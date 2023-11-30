from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BannerAndIntroSerializer
from .models import BannerAndIntro
from rest_framework import status
from django.http import Http404

# Create your views here.

class BannerAndIntroAPIView(generics.CreateAPIView):
     permission_classes = [permissions.IsAuthenticated]
     serializer_class = BannerAndIntroSerializer
     queryset = BannerAndIntro.objects.all()

     """
     get Banner and Intro, or create a new Banner and Intro.
     """

     def get(self, request, format=None):
        snippets = BannerAndIntro.objects.all()
        serializer = BannerAndIntroSerializer(snippets, many=True)
        return Response({"bannerandintro": serializer.data}, status=status.HTTP_200_OK)
    
     def post(self, request, format=None):
        serializer = BannerAndIntroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"bannerandintro": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BannerAndIntroUpdateAndDeleteView(APIView):
    """
    Retrieve, update or delete a BannerAndIntro instance.
    """
    def get_object(self, pk):
        try:
            return BannerAndIntro.objects.get(pk=pk)
        except BannerAndIntro.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = BannerAndIntroSerializer(snippet)
        return Response({"bannerandintro": serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = BannerAndIntroSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"bannerandintro": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


   
class ClientBannerAndIntroView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = BannerAndIntro.objects.all()
    serializer_class = BannerAndIntroSerializer

    """
    List all BannerAndIntro, or create a new BannerAndIntro.
    """

    def get(self, request, format=None):
        snippets = BannerAndIntro.objects.all()
        serializer = BannerAndIntroSerializer(snippets, many=True)
        return Response({"bannerandintro": serializer.data}, status=status.HTTP_200_OK)