# Generated by Django 3.1.2 on 2020-12-08 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rodeo_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='genre',
            field=models.TextField(default='Gra Towarzyska'),
            preserve_default=False,
        ),
    ]
