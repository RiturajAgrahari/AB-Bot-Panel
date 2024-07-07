from rest_framework import serializers
from .models import (Profile, TodayLuck, Events, Personalized_test_question, Personalized_test_answer, Record,
                     BotInfo, Inventory)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "uid",
            "name",
            "discord_id",
            "event_used",
            "last_used_on"
        ]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = [
            "id",
            "uid",
            "letter_event"
        ]


class TodayLuckSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodayLuck
        fields = [
            "uid",
            "location",
            "container",
            "weapon",
            "item",
            "summary",
        ]


class PersonalizedQuestionsSerializers(serializers.ModelSerializer):
     class Meta:
         model = Personalized_test_question
         fields = [
             "id",
             "title",
             "description",
             "image",
             "type",
             "time",
         ]


class PersonalizedAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personalized_test_answer
        fields = [
            "id",
            "user_id",
            "question_id",
            "answers",
            "time",
        ]


class TodayLuckRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = [
            "sn",
            "date",
            "number_of_uses",
        ]


class BotInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotInfo
        fields = [
            "sn",
            "date",
            "fandom_bot",
            "lucky_bot",
            "rpg_bot",
        ]


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = [
            "id",
            "uid",
            "achievement",
            "storage",
            "koens",
            "status",
        ]