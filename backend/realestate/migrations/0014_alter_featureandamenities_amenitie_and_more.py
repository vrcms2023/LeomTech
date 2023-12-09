# Generated by Django 4.2.5 on 2023-12-08 11:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('realestate', '0013_remove_specifications_specification_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='featureandamenities',
            name='amenitie',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='featureandamenities',
            name='feature',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='featureandamenities',
            name='googleMap',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='projects',
            name='aboutstitle',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='projects',
            name='aboutussubtitle',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='projects',
            name='description',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='projects',
            name='imageDescription',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='projects',
            name='percentValue',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='specifications',
            name='feature',
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name='specifications',
            name='title',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]