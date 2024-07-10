from django.contrib import admin
from .models import Personalized_test_question


# Register your models here.
class PersonalizedQuestionsAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "description",
        "image",
        "type",
        "time",
    ]

admin.site.register(Personalized_test_question, PersonalizedQuestionsAdmin)
