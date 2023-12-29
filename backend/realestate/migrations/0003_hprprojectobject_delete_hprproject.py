# Generated by Django 4.2.5 on 2023-09-18 17:04

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('realestate', '0002_hprproject'),
    ]

    operations = [
        migrations.CreateModel(
            name='HprProjectObject',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('projectCategoryID', models.CharField(max_length=100)),
                ('projectCategoryName', models.CharField(max_length=50)),
                ('projectCategoryValue', models.CharField(max_length=50)),
                ('projectTitle', models.CharField(max_length=50, unique=True)),
                ('description', models.CharField(max_length=5000, null=True)),
                ('percentValue', models.CharField(max_length=50)),
                ('isActive', models.BooleanField(default=False)),
                ('publish', models.BooleanField(default=False)),
                ('userID', models.CharField(max_length=50)),
                ('created_by', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.DeleteModel(
            name='HprProject',
        ),
    ]
