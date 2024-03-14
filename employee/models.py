from django.db import models

class employee(models.Model):
    
    image = models.ImageField(upload_to='uploads/images', null=True, blank=True)
    email=models.CharField(max_length=100,default='xyz@gmail.com')
    name=models.CharField(max_length=100,default='john doe')
    age=models.CharField(max_length=10,default='50')
    qualification=models.CharField(max_length=255,default='null')
    phone=models.CharField(max_length=20,unique=True,default='00000000')
    type=models.CharField(max_length=15,default='counsellor')
class ValidLink(models.Model):
    secure_str=models.CharField(max_length=50)
