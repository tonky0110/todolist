# Generated by Django 2.0.8 on 2018-08-24 12:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20180824_2115'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='user',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='user',
            name='profile_image',
        ),
        migrations.RemoveField(
            model_name='user',
            name='website',
        ),
    ]