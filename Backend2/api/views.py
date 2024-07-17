import cloudinary.uploader
# from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import generics, mixins

from rest_framework.pagination import PageNumberPagination

from .forms import PersonalizedTestQuestion
from .models import (Profile, TodayLuck, Inventory, Personalized_test_question, Personalized_test_answer, Record,
                     BotInfo, BotReview)
from .serializers import (ProfileSerializer, TodayLuckSerializer, PersonalizedQuestionsSerializers,
                          PersonalizedAnswersSerializer, TodayLuckRecordSerializer, BotInfoSerializer,
                          InventorySerializer, BotReviewSerializer)
# from .filters import InventorySearchFilter

import logging

logger = logging.getLogger("django")
info_logger = logging.getLogger("log_info")
error_logger = logging.getLogger("log_error")


# Create your views here.


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_panel(request, *args, **kwargs):
    user = request.user.username
    print(user)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def total_today_luck(request, *args, **kwargs):
    if str(request.user) == "Arena":
        total_today_lucks = TodayLuck.objects.all().count()
        total_reviews = BotReview.objects.all().count()
    else:
        total_today_lucks = 10
        total_reviews = BotReview.objects.all().order_by("id").filter(id__lt=10).count()

    data = {
        'total_today_luck': total_today_lucks,
        'total_reviews': total_reviews,
    }

    return Response(data)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def total_inventories(request, *args, **kwargs):
    """
    DRF api view
    """
    if str(request.user) == "Arena":
        total_inventory = Inventory.objects.all().count()
    else:
        total_inventory = Inventory.objects.all().order_by('id').filter(id__lt=100).count()

    data = {
        'total_inventories': total_inventory,
    }

    return Response(data)


class InventoryMixinView(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        if str(self.request.user) == "Arena":
            return super().get_queryset()
        else:
            return super().get_queryset().order_by('id').filter(id__lt=100)
            # return super().get_queryset()[:100]

    def get(self, request, *args, **kwargs):
        filter_word = request.query_params.get("filterword", None)
        if filter_word == "true":
            self.queryset = self.get_queryset().exclude(storage='None')
            return self.list(request, *args, **kwargs)

        return self.list(request, *args, **kwargs)


class TodayLuckMixinView(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = TodayLuck.objects.all()
    serializer_class = TodayLuckSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            search_query = request.query_params.get("search", None)
            search_category = request.query_params.get("category", None)

            if search_category and search_query:
                    queryset = self.queryset.filter(**{f"{search_category}__icontains": search_query})
                    queryset_data = self.serializer_class(queryset, many=True).data
                    return Response(queryset_data)

            return self.list(request, *args, **kwargs)

        else:
            # limit unauthenticated users to the first 100 objects
            search_query = request.query_params.get("search", None)
            search_category = request.query_params.get("category", None)

            if search_category and search_query:
                guest_qs = list(TodayLuck.objects.values_list("pk", flat=True)[:10])

                self.queryset = self.get_queryset().filter(pk__in=guest_qs).filter(**{f"{search_category}__icontains": search_query})
                return self.list(request, *args, **kwargs)

            self.queryset = self.get_queryset()[0:10]
            return self.list(request, *args, **kwargs)


class ProfilesMixinView(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    pagination_class = StandardResultsSetPagination

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            return self.list(request, *args, **kwargs)

        else:
            self.queryset = Profile.objects.all().order_by("uid").values()[0:100]
            return self.list(request, *args, **kwargs)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def total_profile_view(request, *args, **kwargs):
    """
    DRF api view
    """
    if str(request.user) == "Arena":
        instances = Profile.objects.all().count()
    else:
        instances = Profile.objects.all().order_by("uid").filter(uid__lt=100).count()

    data = {
            'total_profiles': instances,
        }

    return Response(data)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def total_personalized_data(request, *args, **kwargs):
    if str(request.user) == "Arena":
        question_instances = Personalized_test_question.objects.all().count()
        answers_instances = Personalized_test_answer.objects.all().count()

    else:
        question_instances = Personalized_test_question.objects.all().order_by("id").filter(id__lt=10).count()
        answers_instances = Personalized_test_answer.objects.all().order_by("id").filter(id__lt=10).count()

    data = {
        "total_questions": question_instances,
        "total_answers": answers_instances
    }

    return Response(data)


class PersonalizedQuestions(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Personalized_test_question.objects.all().order_by("-id")
    serializer_class = PersonalizedQuestionsSerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            return self.list(request, *args, **kwargs)
        else:
            self.queryset = self.get_queryset().order_by("id")[:5]
            return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            info_logger.info(f"{self.request.user} is trying adding a question!")
            title = request.data.get("title")
            description = request.data.get("description")
            question_type = request.data.get("questiontype")
            date_time = request.data.get("time")

            for filename, file in request.FILES.items():
                image = request.FILES[filename].file

            cloudinary_response = cloudinary.uploader.upload(image, folder="BotPanel", unique_filename=True,
                                                             overwrite=False)
            image_url = cloudinary_response['url']

            info_logger.info(f"question information! \n"
                             f"title - {title} \n"
                             f"description - {description} \n"
                             f"question type - {question_type} \n"
                             f"date time - {date_time} \n"
                             f"image url - {image_url} \n")

            form = PersonalizedTestQuestion(
                {"title": title, "description": description, "image": image_url, "type": question_type, "time": date_time})
            if form.is_valid():
                form.save()
                info_logger.info(f"{request.user} successfully added a question!")

            error_logger.error(form.errors)

            return Response({"data": "i got your response bro"})
        else:
            return Response({"error": "Guests can't post questions"}, status=401)


class PersonalizedAnswers(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Personalized_test_answer.objects.all()
    serializer_class = PersonalizedAnswersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            question_id = request.query_params.get("question_id")
            if question_id:
                self.queryset = self.get_queryset().filter(question_id__iexact=int(question_id))
                return self.list(request, *args, **kwargs)

            return self.list(request, *args, **kwargs)
        else:
            self.queryset = Personalized_test_answer.objects.all()[0:10]
            question_id = request.query_params.get("question_id")
            if question_id:
                try:
                    serialized_data = PersonalizedAnswersSerializer(self.queryset, many=True).data
                    answers = []
                    for answer in serialized_data:
                        if int(answer["question_id"]) == int(question_id):
                            answers.append(answer)
                    return Response(answers)
                except ValueError:
                    return Response([])

            return self.list(request, *args, **kwargs)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def lucky_bot_record(request, *args, **kwargs):
    if str(request.user) == "Arena":
        recordLimit = request.query_params.get("recordlimit")
        queryset = Record.objects.all().exclude(date=None)
        serialized_data = TodayLuckRecordSerializer(queryset, many=True).data
        if recordLimit:
            if recordLimit == "month":
                return Response(data=serialized_data[len(serialized_data) - 30: len(serialized_data)])
            elif recordLimit == "week":
                return Response(data=serialized_data[len(serialized_data) - 7: len(serialized_data)])

        return Response(data=serialized_data)
    else:
        recordLimit = request.query_params.get("recordlimit")
        queryset = Record.objects.all().exclude(date=None)[0:40]
        serialized_data = TodayLuckRecordSerializer(queryset, many=True).data
        if recordLimit:
            if recordLimit == "month":
                return Response(data=serialized_data[len(serialized_data) - 30: len(serialized_data)])
            elif recordLimit == "week":
                return Response(data=serialized_data[len(serialized_data) - 7: len(serialized_data)])

        return Response(data=serialized_data)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def bot_information(request, *args, **kwargs):
    if str(request.user) == "Arena":
        recordLimit = request.query_params.get("recordlimit")
        queryset = BotInfo.objects.all()
        serialized_data = BotInfoSerializer(queryset, many=True).data
        if recordLimit:
            if recordLimit == "month":
                return Response(data=serialized_data[len(serialized_data) - 30: len(serialized_data)])
            elif recordLimit == "week":
                return Response(data=serialized_data[len(serialized_data) - 7: len(serialized_data)])

        return Response(data=serialized_data)
    else:
        recordLimit = request.query_params.get("recordlimit")
        queryset = BotInfo.objects.all()[0:40   ]
        serialized_data = BotInfoSerializer(queryset, many=True).data
        if recordLimit:
            if recordLimit == "month":
                return Response(data=serialized_data[len(serialized_data) - 30: len(serialized_data)])
            elif recordLimit == "week":
                return Response(data=serialized_data[len(serialized_data) - 7: len(serialized_data)])

        return Response(data=serialized_data)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def CheckProfile(request, *args, **kwargs):
    if str(request.user) == "Arena":
        profile_information = {}
        uid = request.query_params.get("uid")
        profile_data = Profile.objects.filter(uid__iexact=uid)
        serialized_profile_data = ProfileSerializer(profile_data, many=True).data
        if serialized_profile_data:
            profile_information.update(serialized_profile_data[0])

        inventory_data = Inventory.objects.filter(uid__iexact=uid)
        serialized_inventory_data = InventorySerializer(inventory_data, many=True).data
        if serialized_inventory_data:
            profile_information.update(serialized_inventory_data[0])

        today_luck_data = TodayLuck.objects.filter(uid__iexact=uid)
        serialized_today_luck_data = TodayLuckSerializer(today_luck_data, many=True).data
        if serialized_today_luck_data:
            profile_information.update(serialized_today_luck_data[0])

        return Response(profile_information)
    else:
        return Response({"error": "Guests are not allowed to check the profile!"}, status=401)


class BotReviews(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = BotReview.objects.all()
    serializer_class = BotReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            return self.list(self, request, *args, **kwargs)
        else:
            return Response({"error": "Guests are not allowed to check the reviews!"}, status=401)
