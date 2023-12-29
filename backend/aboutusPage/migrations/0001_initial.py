# Generated by Django 4.2.5 on 2023-11-13 16:53

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Aboutus',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('imageUrl', models.CharField(max_length=100, null=True)),
                ('imageId', models.CharField(max_length=100, null=True)),
                ('originalname', models.CharField(max_length=100, null=True)),
                ('aboutus_title', models.CharField(max_length=500, null=True)),
                ('aboutus_description', models.CharField(max_length=5000, null=True)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_by', models.CharField(max_length=50)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
