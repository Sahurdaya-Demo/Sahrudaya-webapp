# Generated by Django 4.2.2 on 2024-02-22 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ValidLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('secure_str', models.CharField(max_length=50)),
            ],
        ),
    ]
