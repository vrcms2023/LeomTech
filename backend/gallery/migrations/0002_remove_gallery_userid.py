# Generated by Django 4.2.5 on 2023-09-22 06:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gallery',
            name='userID',
        ),
    ]
