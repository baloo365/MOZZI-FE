# Generated by Django 4.2.7 on 2024-03-08 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('food_name', models.CharField(max_length=30)),
                ('food_recipe', models.CharField(max_length=255)),
                ('food_views', models.IntegerField()),
                ('food_pic', models.CharField(max_length=200)),
                ('food_salty_rate', models.FloatField()),
                ('food_sweet_rate', models.FloatField()),
                ('food_bitter_rate', models.FloatField()),
                ('food_sour_rate', models.FloatField()),
                ('food_umami_rate', models.FloatField()),
                ('food_spicy_rate', models.FloatField()),
                ('food_category', models.CharField(max_length=5)),
                ('food_today_views', models.IntegerField()),
                ('food_category_count', models.IntegerField()),
            ],
        ),
    ]
