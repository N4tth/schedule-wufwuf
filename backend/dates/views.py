from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializer import *

# Create your views here.

# Vista para el rest de crear citas
class DatesViewSet(viewsets.ModelViewSet):
    queryset =  Dates.objects.all()
    serializer_class = DatesSerializer