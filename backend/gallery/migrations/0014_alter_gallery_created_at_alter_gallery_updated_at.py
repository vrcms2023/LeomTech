# Generated by Django 4.2.5 on 2023-12-30 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0013_alter_gallery_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gallery',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='gallery',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
