# Generated by Django 4.2.5 on 2023-09-21 04:19

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('realestate', '0009_specification'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='specification',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='specification',
            name='projectID',
        ),
        migrations.RemoveField(
            model_name='specification',
            name='updated_at',
        ),
        migrations.CreateModel(
            name='Specifications',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('projectID', models.CharField(max_length=100, unique=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('specification', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='realestate.specification')),
            ],
        ),
    ]
