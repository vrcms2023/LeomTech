# Generated by Django 4.2.5 on 2023-12-08 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appNews', '0002_rename_imageid_appnews_imageids_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appnews',
            name='description',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='appnews',
            name='imageIds',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='appnews',
            name='imageUrls',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='appnews',
            name='newstitle',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='appnews',
            name='originalnames',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
