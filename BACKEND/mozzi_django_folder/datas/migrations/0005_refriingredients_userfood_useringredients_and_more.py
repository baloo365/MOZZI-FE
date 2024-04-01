# Generated by Django 4.2.11 on 2024-03-30 15:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('datas', '0004_merge_20240328_1248'),
    ]

    operations = [
        migrations.CreateModel(
            name='RefriIngredients',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='datas.user')),
                ('expiration_date', models.DateTimeField(blank=True, null=True)),
                ('stored_pos', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'refri_ingredients',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserFood',
            fields=[
                ('user_food_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_food_preference', models.FloatField(blank=True, null=True)),
                ('total', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'user_food',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserIngredients',
            fields=[
                ('user_ingredients_id', models.AutoField(primary_key=True, serialize=False)),
                ('is_like', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'user_ingredients',
                'managed': False,
            },
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'managed': False},
        ),
    ]
