# Generated by Django 4.2.5 on 2023-12-08 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aboutusPage', '0002_aboutus_alt_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='aboutus',
            name='aboutus_description',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='aboutus_title',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='alt_text',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='imageId',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='imageUrl',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='aboutus',
            name='originalname',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
