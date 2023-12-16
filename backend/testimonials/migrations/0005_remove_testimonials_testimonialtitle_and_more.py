# Generated by Django 4.2.5 on 2023-12-16 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testimonials', '0004_remove_testimonials_imagedescription_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='testimonials',
            name='testimonialTitle',
        ),
        migrations.AddField(
            model_name='testimonials',
            name='testimonial_description',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AddField(
            model_name='testimonials',
            name='testimonial_sub_title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='testimonials',
            name='testimonial_title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]