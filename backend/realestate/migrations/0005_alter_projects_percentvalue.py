# Generated by Django 4.2.5 on 2023-09-18 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('realestate', '0004_projects_delete_hprprojectobject'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='percentValue',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
