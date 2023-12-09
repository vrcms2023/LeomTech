# Generated by Django 4.2.5 on 2023-09-20 17:16

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('realestate', '0008_featureandamenities_delete_amenitiesandfeature'),
    ]

    operations = [
        migrations.CreateModel(
            name='Specification',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('projectID', models.CharField(max_length=100, unique=True)),
                ('title', models.CharField(max_length=500, null=True)),
                ('feature', models.CharField(max_length=5000, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]