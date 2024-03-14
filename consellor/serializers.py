from rest_framework import serializers
from .models import counsellor
class  CounsellorSerializer(serializers.ModelSerializer):
    class Meta:
        model = counsellor
        fields='__all__'