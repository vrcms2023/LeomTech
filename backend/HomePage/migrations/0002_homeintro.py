# Generated by Django 4.2.5 on 2023-11-11 05:49

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('HomePage', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HomeIntro',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('intro_title', models.CharField(max_length=100, null=True)),
                ('intro_desc', models.CharField(max_length=100, null=True)),
                ('intro_morelink', models.CharField(max_length=100, null=True)),
                ('subTitle', models.JSONField(null=True)),
                ('created_by', models.CharField(max_length=50)),
                ('updated_by', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
