from django.shortcuts import render
from rest_framework import viewsets,status
from .models import counsellor
from employee.models import employee
from .serializers import CounsellorSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from ptsessions.models import ptsessions

class submitview(viewsets.ModelViewSet):
 queryset= counsellor.objects.all()
 serializer_class = CounsellorSerializer
 
 def update(self, request, *args, **kwargs):
        # print(request.data['uniqueid'],request.data['name'])
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        session=ptsessions.objects.filter(uniqueid=request.data['uniqueid'])
        # session.name=request.data['name']
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        for item in session:
             item.name=request.data['name']
             item.save()
        # session.save()
        return Response(serializer.data)
 def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            session=ptsessions.objects.filter(uniqueid=request.data['uid'])
            for item in session:
             item.delete()
            return Response({"message": "Record deleted successfully"},status=status.HTTP_200_OK)
        except counsellor.DoesNotExist:
            return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
class emailchange(APIView):
     def post(self, request, format=None):
          email=counsellor.objects.get(id=request.data['id'])
          name=employee.objects.get(email=request.data['email'])
          session=ptsessions.objects.filter(uniqueid=request.data['uid'])
          for item in session:
               item.email=request.data['email']
               item.nameofcounsellor=name.name
               item.save()
          email.email=request.data['email']
          email.nameofcounsellor=name.name
          
          email.save()
          
          return Response({"message": "Record deleted successfully"},status=status.HTTP_200_OK)
