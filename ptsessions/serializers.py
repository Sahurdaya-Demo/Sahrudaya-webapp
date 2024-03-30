from rest_framework import serializers
from .models import ptsessions
class  SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ptsessions
        fields='__all__'