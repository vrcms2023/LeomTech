# Generated by Django 4.2.5 on 2023-12-08 11:34

import common.BaseModel
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0010_alter_gallery_contenttype_alter_gallery_originalname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='gallery',
            old_name='updated_by',
            new_name='updated_by',
        ),
        migrations.AlterField(
            model_name='gallery',
            name='created_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='gallery',
            name='path',
            field=models.FileField(blank=True, null=True, upload_to=common.BaseModel.image_upload_path),
        ),
        migrations.AlterField(
            model_name='gallery',
            name='updated_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]