# Generated by Django 3.2 on 2021-07-30 10:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jqrally_api', '0003_auto_20210726_2330'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventspot',
            name='description',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
