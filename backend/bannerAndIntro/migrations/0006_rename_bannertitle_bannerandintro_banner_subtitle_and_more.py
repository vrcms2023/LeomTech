# Generated by Django 4.2.5 on 2023-12-16 10:34

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('bannerAndIntro', '0005_remove_bannerandintro_imagedescription_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bannerandintro',
            old_name='bannerTitle',
            new_name='banner_subTitle',
        ),
        migrations.AddField(
            model_name='bannerandintro',
            name='banner_descripiton',
            field=models.CharField(default=django.utils.timezone.now, max_length=5000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bannerandintro',
            name='banner_title',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
    ]
