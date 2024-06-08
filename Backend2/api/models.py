from django.db import models

# Create your models here.


class Profile(models.Model):
    uid = models.BigAutoField(primary_key=True)
    name = models.CharField(verbose_name="Name", max_length=50, null=True)
    discord_id = models.CharField(verbose_name="Discord ID", max_length=100, null=True)
    event_used = models.BigIntegerField(verbose_name="Command used", null=True, default=0)
    last_used_on = models.DateField(verbose_name="Last Used On", null=True, auto_now=True)

    class Meta:
        db_table = "profile"
        managed = False


class TodayLuck(models.Model):
    uid = models.BigIntegerField(verbose_name="uid", primary_key=True)
    location = models.CharField(verbose_name="Lucky Location", max_length=100, null=True)
    container = models.CharField(verbose_name="Lucky Container", max_length=100, null=True)
    weapon = models.CharField(verbose_name="Lucky Weapon", max_length=100, null=True)
    item = models.CharField(verbose_name="Lucky Item", max_length=100, null=True)
    summary = models.CharField(verbose_name="Summary", max_length=300, null=True)

    class Meta:
        db_table = "today_luck"
        managed = False


class Events(models.Model):
    id = models.BigIntegerField(verbose_name="id", primary_key=True)
    uid = models.BigIntegerField(verbose_name="uid", null=True)
    storage = models.CharField(verbose_name="storage", max_length=100, null=True)
    letter_event = models.CharField(verbose_name="letter event", max_length=25, null=True)

    class Meta:
        db_table = "events"
        managed = False


class Inventory(models.Model):
    id = models.BigIntegerField(verbose_name="id", primary_key=True)
    uid = models.BigIntegerField(verbose_name="uid", null=True)
    achievement = models.CharField(verbose_name="Achievement", max_length=300, null=True)
    storage = models.CharField(verbose_name="Storage", max_length=400, null=True)
    koens = models.IntegerField(verbose_name="Koens", null=True, default=0)
    status = models.CharField(verbose_name="Status", max_length=20, null=True, default="not_claimed")

    class Meta:
        db_table = "inventory"
        managed = False


class Personalized_test_question(models.Model):
    id = models.BigIntegerField(verbose_name="id", primary_key=True)
    title = models.CharField(verbose_name="title", max_length=225, null=True)
    description = models.CharField(verbose_name='description', max_length=400, null=True)
    image = models.URLField(verbose_name="image", null=True)
    type = models.CharField(verbose_name="type", max_length=100, null=True)
    time = models.DateTimeField(verbose_name="time", null=True)

    class Meta:
        db_table = "personalized_test_question"
        managed = False


class Personalized_test_answer(models.Model):
    id = models.BigIntegerField(verbose_name="id", primary_key=True)
    user_id = models.BigIntegerField(verbose_name="uid", null=False)
    question_id = models.BigIntegerField(verbose_name="question id", null=False)
    answers = models.CharField(verbose_name="answers", max_length=224, null=True)
    time = models.DateTimeField(verbose_name="time", null=True)

    class Meta:
        db_table = "personalized_test_answer"
        managed = False