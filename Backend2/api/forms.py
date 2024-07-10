from django.forms import ModelForm
from .models import Personalized_test_question


class PersonalizedTestQuestion(ModelForm):
    class Meta:
        model = Personalized_test_question
        fields = [
            "title",
            "description",
            "image",
            "type",
            "time",
        ]
