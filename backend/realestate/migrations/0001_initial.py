# Generated by Django 4.2.5 on 2023-09-17 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectCategory',
            fields=[
                ('idprojectcategories', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('projectLabel', models.CharField(max_length=50)),
                ('projectValue', models.CharField(max_length=50)),
            ],
        ),
    ]
