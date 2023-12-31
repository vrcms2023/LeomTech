# Generated by Django 4.2.5 on 2023-11-11 10:28

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CaseStudies',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('imageUrls', models.JSONField(null=True)),
                ('imageIds', models.JSONField(null=True)),
                ('originalnames', models.JSONField(null=True)),
                ('case_studies_title', models.CharField(max_length=500, null=True)),
                ('case_studies_description', models.JSONField(null=True)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_by', models.CharField(max_length=50)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
