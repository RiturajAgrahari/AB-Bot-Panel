from django.urls import path
from api import views

urlpatterns = [
    path("bots/usage-information/", views.bot_information, name="all_bot_information"),
    path("lucky-bot/total_today_luck/", views.total_today_luck, name="total_today_lucks"),
    path("lucky-bot/today_luck/", views.TodayLuckMixinView.as_view(), name="today_luck"),
    path("lucky-bot/records/", views.lucky_bot_record, name="lucky_bot_record"),
    path("lucky-bot/bot-reviews/", views.BotReviews.as_view(), name="bot review"),
    path("rpg-bot/total_inventory/", views.total_inventories, name="total_inventories"),
    path("rpg-bot/inventories/", views.InventoryMixinView.as_view(), name="inventories"),
    path("personalized-bot/total-record/", views.total_personalized_data, name="total_test_data"),
    path("personalized-bot/questions/", views.PersonalizedQuestions.as_view(), name="questions"),
    path("personalized-bot/answers/", views.PersonalizedAnswers.as_view(), name="answers"),
    path("total_profiles/", views.total_profile_view, name="total_inventories"),
    path("profiles/", views.ProfilesMixinView.as_view(), name="profiles"),
    path("profiles/profile/", views.CheckProfile, name="profile"),
    path("personalized-bot/add-question/", views.PersonalizedQuestions.as_view(), name="add_question")
    # path("profiles/<int:uid>", views.ProfilesMixinView.as_view(), name="one-profiles"),
    # path("get_all_profiles/", views.get_all_profile, name="one-profiles"),
    # path("get_all_today_luck/", views.get_all_today_luck, name="get-all-today-luck"),
]