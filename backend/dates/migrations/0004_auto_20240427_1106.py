# Generated by Django 3.2.8 on 2024-04-27 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dates', '0003_alter_dates_pet_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dates',
            name='user_id',
        ),
        migrations.AddField(
            model_name='dates',
            name='username',
            field=models.CharField(blank=True, max_length=32),
        ),
    ]