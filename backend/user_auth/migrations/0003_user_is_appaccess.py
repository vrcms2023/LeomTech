# Generated by Django 4.2.5 on 2023-09-13 09:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0002_rename_name_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_appAccess',
            field=models.BooleanField(default=False),
        ),
    ]