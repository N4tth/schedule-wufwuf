from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class Dates(models.Model):
    create_date = models.DateTimeField(auto_now_add=True)
    date_time = models.DateField(blank=False)
    hour_date_time = models.TimeField(blank=False)
    username = models.CharField(max_length=32, blank=True)
    pet_id = models.IntegerField(blank=False)
    name = models.TextField()
    last_name = models.TextField()
    email = models.EmailField()
    