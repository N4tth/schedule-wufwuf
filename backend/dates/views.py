from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import *
from .serializer import *
from .utils import send_confirmation_email

# Create your views here.

# Vista para el rest de crear citas
class DatesViewSet(viewsets.ModelViewSet):
    queryset =  Dates.objects.all()
    serializer_class = DatesSerializer

    def perform_create(self, serializer):
        instance = serializer.save()

        # Aquí obtén los datos de la cita creada para usar en el correo electrónico de confirmación
        email = instance.email
        subject = 'Confirmación de cita'
        context = {
            'nombre': instance.name,
            'apellido': instance.last_name,
            'date_time': instance.date_time,
            'hour_date_time': instance.hour_date_time,
            'email': instance.email
        }

        # Aquí envía el correo electrónico de confirmación
        send_confirmation_email(email, subject, context)

        return Response(serializer.data, status=status.HTTP_201_CREATED)