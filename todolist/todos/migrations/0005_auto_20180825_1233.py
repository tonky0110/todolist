# Generated by Django 2.0.8 on 2018-08-25 03:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0004_remove_refer_useyn'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(max_length=4000),
        ),
    ]