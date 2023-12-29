# Generated by Django 4.2.5 on 2023-09-26 07:46

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Testimonials',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('projectID', models.CharField(max_length=100)),
                ('imageUrl', models.CharField(max_length=100, null=True)),
                ('imageId', models.CharField(max_length=100, null=True)),
                ('originalname', models.CharField(max_length=100, null=True)),
                ('title', models.CharField(max_length=500, null=True)),
                ('description', models.CharField(max_length=5000, null=True)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_by', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
