from rest_framework import serializers

from .models import employee,ValidLink

class EmpSerializer(serializers.ModelSerializer):
    class Meta:
        model = employee
        fields = '__all__'

class ValidSerializer(serializers.ModelSerializer):
    # secure_str=serializers.CharField(max_length=50)
    class Meta:
        model = ValidLink
        fields = '__all__'
    # def validate(self, attrs):
    #     secure_str1=attrs.get('secure_str')
    #     print(secure_str1)
    #     if ValidLink.objects.filter(secure_str=secure_str1).exists():
    #          raise serializers.ValidationError('Link Exists')