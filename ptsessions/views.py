from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import SessionSerializer
from rest_framework import viewsets,status
from .models import ptsessions
class crudsession(viewsets.ModelViewSet):
    queryset= ptsessions.objects.all()
    serializer_class = SessionSerializer
    def update(self, request, *args, **kwargs):
            partial = kwargs.pop('partial', False)
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
    def destroy(self, request, *args, **kwargs):
            try:
                instance = self.get_object()
                self.perform_destroy(instance)
                return Response({"message": "Record deleted successfully"},status=status.HTTP_200_OK)
            except ptsessions.DoesNotExist:
                return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)


class insertsession(APIView):
   def post(self, request, format=None):
            if ptsessions.objects.filter(uniqueid=request.data['uniqueid']).exists():
                  return Response({'errors':'unique id required'},status=status.HTTP_200_OK)
            else:
                
                serializer = SessionSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                print('ok')
                return Response({'message': 'record added'}, status=status.HTTP_200_OK)
           