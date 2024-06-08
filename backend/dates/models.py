from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Dates(models.Model):
    create_date = models.DateTimeField(auto_now_add=True)
    date_time = models.DateField(blank=False)
    hour_date_time = models.TimeField(blank=False)
    pet_id = models.IntegerField(blank=False)
    phone_number = PhoneNumberField(blank=True)
    nombre = models.CharField(max_length=50, blank=True)
    apellido = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    