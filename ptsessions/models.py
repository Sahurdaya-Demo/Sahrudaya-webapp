from django.db import models

# Create your models here.
class ptsessions(models.Model):
    date=models.DateField()
    name = models.CharField(max_length=100)
    nameofcounsellor=models.CharField(max_length=100)
    sessiondesc=models.CharField(max_length=100)
    uniqueid=models.CharField(max_length=100,unique=True)
    email=models.CharField(max_length=50,default='null')