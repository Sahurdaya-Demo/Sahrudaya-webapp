# Generated by Django 4.2.2 on 2024-03-30 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ptsessions', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ptsessions',
            name='email',
            field=models.CharField(default='null', max_length=50),
        ),
    ]
