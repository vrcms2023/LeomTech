# Generated by Django 4.2.5 on 2023-11-18 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servicePage', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceaccordion',
            name='serviceID',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='servicefeature',
            name='serviceID',
            field=models.CharField(max_length=100),
        ),
    ]
