# Generated by Django 4.2.5 on 2023-12-30 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('footer', '0007_alter_address_address_dr_no_alter_address_city_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='googlemapurl',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='googlemapurl',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='termsandcondition',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='termsandcondition',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
