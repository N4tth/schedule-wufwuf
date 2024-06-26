# Generated by Django 3.2.8 on 2024-04-26 13:52

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dates',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_date', models.DateTimeField(auto_now_add=True)),
                ('date_time', models.DateTimeField()),
                ('hour_date_time', models.TimeField()),
                ('user_id', models.CharField(blank=True, max_length=100)),
                ('phone_number', phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region=None)),
                ('nombre', models.CharField(blank=True, max_length=50)),
                ('apellido', models.CharField(blank=True, max_length=50)),
                ('email', models.EmailField(blank=True, max_length=254)),
            ],
        ),
    ]
