# Generated by Django 4.2.5 on 2023-12-30 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bannerAndIntro', '0007_alter_bannerandintro_banner_descripiton_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bannerandintro',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='bannerandintro',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
