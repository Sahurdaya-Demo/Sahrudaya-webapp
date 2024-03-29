from datetime import timedelta
from django.db import connection
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status,permissions
from rest_framework import viewsets
from .models import employee,ValidLink
from account.models import User
from rest_framework.views import APIView
from .serializers import EmpSerializer,ValidSerializer
from django.utils import timezone
class EmpView(viewsets.ModelViewSet):
    queryset = employee.objects.all()
    serializer_class = EmpSerializer
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
          #   print(instance.id)
            emp=employee.objects.get(id=instance.id)
          #   print(emp.email)
            self.perform_destroy(instance)
            User.objects.filter(email=emp.email).delete()
            return Response({"message": "Record deleted successfully"},status=status.HTTP_200_OK)
        except employee.DoesNotExist:
            return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        emp=employee.objects.get(id=instance.id)
        user=User.objects.get(email=emp.email)
     #    print(request.data['name'])
        user.name=request.data['name']
        user.save()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)   
    
class ValidPost(APIView):
     def post(self, request, format=None):
          serialized = ValidSerializer(data=request.data)
          serialized.is_valid(raise_exception=True)
          serialized.save()
          return Response({'msg':'added'}, status=status.HTTP_201_CREATED)
    #  def get(self, request, format=None):
    #     #   validity=ValidLink.objects.get(secure_str=request.data.get('secure_str'))
    #       return Response({'msg':validity}, status=status.HTTP_201_CREATED)
class ValidGet(APIView):
     def post(self, request, format=None):
          # try:
          #  serialized = ValidSerializer(data=request.data)
          #  return Response({'msg':'link valid'}, status=status.HTTP_201_CREATED)
          # except:
          #   return Response({'errors':'link invalid'}, status=status.HTTP_200_OK)  
          serialized = ValidSerializer(data=request.data)
          serialized.is_valid(raise_exception=True)
          if ValidLink.objects.filter(secure_str=serialized.data.get('secure_str')).exists():
               return Response({'errors':'link invalid'}, status=status.HTTP_200_OK)  
          else:
               return Response({'msg':'link valid'}, status=status.HTTP_201_CREATED)

class GetCount(APIView):
     def post(self,request,format=None):
          today_date = timezone.now().date()
          yesterday_date = today_date - timedelta(days=1)
          query=f'''select COUNT(*) from consellor_counsellor c join employee_employee e on c.email=e.email where e.email='{request.data['email']}';
                  select COUNT(*) from consellor_counsellor c join employee_employee e on c.email=e.email where e.email='{request.data['email']}'AND c.date='{today_date}';
                  select COUNT(*) from consellor_counsellor c join employee_employee e on c.email=e.email where e.email='{request.data['email']}'AND c.date='{yesterday_date}';
                 '''
          with connection.cursor() as cursor:
            cursor.execute(query)
            overall=str(cursor.fetchall()[0][0])
            cursor.nextset()
            today=str(cursor.fetchall()[0][0])
            cursor.nextset()
            yesterday=str(cursor.fetchall()[0][0])
          return Response({'today':today,'overall':overall,'yesterday':yesterday}, status=status.HTTP_200_OK)  

