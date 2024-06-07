from rest_framework import serializers
from .models import Profile, TodayLuck, Events


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
