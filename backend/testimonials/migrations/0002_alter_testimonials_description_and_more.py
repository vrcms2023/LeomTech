# Generated by Django 4.2.5 on 2023-12-08 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testimonials', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testimonials',
            name='description',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='testimonials',
            name='imageId',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='testimonials',
            name='imageUrl',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='testimonials',
            name='originalname',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='testimonials',
            name='title',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]