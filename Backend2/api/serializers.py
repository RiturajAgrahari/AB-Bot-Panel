from rest_framework import serializers
from .models import Profile, TodayLuck, Events, Personalized_test_question, Personalized_test_answer


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
            "storage",
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