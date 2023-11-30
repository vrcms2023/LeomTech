# Generated by Django 4.2.5 on 2023-11-18 16:37

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ServiceAccordion',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('serviceID', models.CharField(max_length=100, unique=True)),
                ('accordion_title', models.CharField(max_length=100)),
                ('accordion_sub_title', models.CharField(max_length=200)),
                ('accordion_description', models.JSONField(null=True)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_By', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='ServiceFeature',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('serviceID', models.CharField(max_length=100, unique=True)),
                ('feature_title', models.CharField(max_length=100)),
                ('feature_sub_title', models.CharField(max_length=200)),
                ('feature_description', models.JSONField(null=True)),
                ('imageUrl', models.CharField(max_length=100, null=True)),
                ('imageId', models.CharField(max_length=100, null=True)),
                ('originalname', models.CharField(max_length=100, null=True)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_By', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('services_page_title', models.CharField(max_length=100)),
                ('publish', models.BooleanField(default=False)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_By', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
