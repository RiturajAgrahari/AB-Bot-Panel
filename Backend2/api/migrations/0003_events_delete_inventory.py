# Generated by Django 5.0.6 on 2024-05-23 07:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_inventory'),
    ]

    operations = [
        migrations.CreateModel(
            name='Events',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False, verbose_name='id')),
                ('uid', models.BigIntegerField(null=True, verbose_name='uid')),
                ('storage', models.CharField(max_length=100, null=True, verbose_name='storage')),
                ('letter_event', models.CharField(max_length=25, null=True, verbose_name='letter event')),
            ],
            options={
                'db_table': 'events',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='Inventory',
        ),
    ]
