from rest_framework import serializers
from .models import *

#Serializer
class DatesSerializer(serializers.ModelSerializer):
    class Meta:
       model = Dates
       fields = '__all__'