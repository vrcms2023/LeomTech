# Generated by Django 4.2.5 on 2023-11-22 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servicePage', '0002_alter_serviceaccordion_serviceid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='serviceaccordion',
            name='accordion_sub_title',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='servicefeature',
            name='feature_sub_title',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
