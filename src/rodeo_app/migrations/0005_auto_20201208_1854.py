# Generated by Django 3.1.2 on 2020-12-08 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rodeo_app', '0004_auto_20201208_1851'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='image',
            field=models.ImageField(default='default.jpg', upload_to=''),
        ),
    ]
