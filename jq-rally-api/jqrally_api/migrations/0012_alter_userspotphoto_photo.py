# Generated by Django 3.2 on 2021-08-08 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jqrally_api', '0011_alter_userspotphoto_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userspotphoto',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='photos/%y/%m/%d/', verbose_name='画像'),
        ),
    ]
