from django.urls import path
from api import views

urlpatterns = [
    path("bots/usage-information/", views.BotInformation, name="all_bot_information"),
    path("lucky-bot/total_today_luck/", views.total_today_luck, name="total_today_lucks"),
    path("lucky-bot/today_luck/", views.today_luck, name="today_luck"),
    path("lucky-bot/records/", views.LuckyBotRecord, name="lucky_bot_record"),
    path("rpg-bot/total_inventory/", views.TotalEventsView, name="total_inventories"),
    path("rpg-bot/inventories/", views.EventsMixinView.as_view(), name="inventories"),
    path("rpg-bot/inventories/<str:search>/", views.EventsMixinView.as_view(), name="searched_inventories"),
    path("personalized-bot/total-record/", views.TotalPersonalizedView, name="total_test_data"),
    path("personalized-bot/questions/", views.PersonalizedQuestionsTwo, name="questions"),
    path("personalized-bot/answers/", views.PersonalizedAnswers.as_view(), name="answers"),
    path("total_profiles/", views.TotalProfilesView, name="total_inventories"),
    path("profiles/", views.ProfilesMixinView.as_view(), name="profiles"),
    path("profiles/profile/", views.CheckProfile, name="profile"),
    path("personalized-bot/add-question/", views.PersonalizedQuestions.as_view(), name="add_question")
    # path("profiles/<int:uid>", views.ProfilesMixinView.as_view(), name="one-profiles"),
    # path("get_all_profiles/", views.get_all_profile, name="one-profiles"),
    # path("get_all_today_luck/", views.get_all_today_luck, name="get-all-today-luck"),
]