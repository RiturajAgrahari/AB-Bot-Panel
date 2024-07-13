import cloudinary.uploader
from django.db.models import Q
from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import generics, mixins, permissions, authentication

from rest_framework.pagination import PageNumberPagination

from .forms import PersonalizedTestQuestion
from .models import Profile, TodayLuck, Events, Inventory, Personalized_test_question, Personalized_test_answer, Record, BotInfo
from .serializers import (ProfileSerializer, EventSerializer, TodayLuckSerializer, PersonalizedQuestionsSerializers,
                          PersonalizedAnswersSerializer, TodayLuckRecordSerializer, BotInfoSerializer,
                          InventorySerializer)

# Create your views here.


def testfun(request):
    return HttpResponse(request, "test view is called!")


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def user_panel(request, *args, **kwargs):
    user = request.user.username
    print(user)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([authentication.SessionAuthentication, JWTAuthentication])
def total_today_luck(request, *args, **kwargs):
    instances = TodayLuck.objects.all()
    total_today_luck = instances.count() if instances else 0

    data = {
        'total_today_luck': total_today_luck,
    }

    if str(request.user) == "Arena":
        return Response(data)
    else:
        return Response({'total_today_luck': "100"})


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def TotalEventsView(request, *args, **kwargs):
    """
    DRF api view
    """
    instances = Events.objects.all()
    total_inventories = instances.count() if instances else 0

    data = {
        'total_inventories': total_inventories,
    }

    if str(request.user) == "Arena":
        return Response(data)
    else:
        return Response({'total_inventories': "100"})


class EventsMixinView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, JWTAuthentication]
    pagination_class = PageNumberPagination
    lookup_field = 'id'
    PageNumberPagination.page_size = 20
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['storage']

    def get(self, request, *args, **kwargs):

        if str(request.user) == "Arena":

            # Setting up how many items must be sent in each page!
            page_items = request.query_params.get("pageitems", 10)
            if page_items == "all":
                PageNumberPagination.page_size = 100000
            else:
                PageNumberPagination.page_size = page_items

            inventory_id = kwargs.get("id")
            if inventory_id is not None:
                return self.retrieve(request, *args, **kwargs)

            search_query = request.query_params.get("search", None)
            search_category = request.query_params.get("category", None)

            if search_category and search_query:
                    queryset = self.queryset.filter(**{f"{search_category}__icontains": search_query})
                    queryset_data = self.serializer_class(queryset, many=True).data

                    # if request.user == "Arena":
                    return Response(queryset_data)
                    # else:
                    #     if queryset_data > 101:
                    #         return Response(queryset_data[len(queryset), len(queryset) - 101: -1])
                    #     return Response(queryset_data)

            # if request.user == "Arena":
            return self.list(request, *args, **kwargs)
            # else:
            #     queryset = Inventory.objects.all()
            #     queryset_data = self.serializer_class(queryset, many=True).data
            #     res_data = {"results": queryset_data[len(queryset_data): len(queryset_data) - 101: -1]}
            #     if len(queryset_data) > 101:
            #         return Response(res_data)
            #     return Response({"results": queryset_data})

        else:
            # Setting up how many items must be sent in each page!
            self.queryset = Inventory.objects.all().order_by('id').values()[0:100]
            page_items = request.query_params.get("pageitems", 10)
            if page_items == "all":
                PageNumberPagination.page_size = 100000
            else:
                PageNumberPagination.page_size = page_items

            inventory_id = kwargs.get("id")
            if inventory_id is not None:
                return self.retrieve(request, *args, **kwargs)

            search_query = request.query_params.get("search", None)
            search_category = request.query_params.get("category", None)

            if search_category and search_query:
                queryset = self.queryset.filter(**{f"{search_category}__icontains": search_query})
                queryset_data = self.serializer_class(queryset, many=True).data

                return Response(queryset_data)

            return self.list(request, *args, **kwargs)


class TodayLuckMixinView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):
    queryset = TodayLuck.objects.all()
    serializer_class = TodayLuckSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, JWTAuthentication]
    lookup_field = "uid"

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            search_query = request.query_params.get("search", None)
            search_category = request.query_params.get("category", None)

            if search_category and search_query:
                    queryset = self.queryset.filter(**{f"{search_category}__icontains": search_query})
                    queryset_data = self.serializer_class(queryset, many=True).data
                    return Response(queryset_data)

            return self.list(request, *args, **kwargs)


# not good for guests
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def today_luck(request, *args, **kwargs):
    queryset = TodayLuck.objects
    search_query = request.query_params.get("search", None)
    search_category = request.query_params.get("category", None)

    if search_category and search_query:
        queryset = queryset.filter(**{f"{search_category}__icontains": search_query})
        serialized_data = TodayLuckSerializer(queryset, many=True)
        if serialized_data:
            return Response(serialized_data.data)

    serialized_data = TodayLuckSerializer(queryset.all(), many=True)
    if serialized_data:
        return Response(serialized_data.data)


class ProfilesMixinView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    lookup_field = 'uid'
    pagination_class = PageNumberPagination
    PageNumberPagination.page_size = 20

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            uid = kwargs.get("uid")

            page_items = request.query_params.get("pageitems", 10)
            if page_items == "all":
                PageNumberPagination.page_size = 100000
            else:
                PageNumberPagination.page_size = page_items
            if uid is not None:
                return self.retrieve(request, *args, **kwargs)
            return self.list(request, *args, **kwargs)

        else:
            self.queryset = Profile.objects.all().order_by("uid").values()[0:100]
            uid = kwargs.get("uid")

            page_items = request.query_params.get("pageitems", 10)
            if page_items == "all":
                PageNumberPagination.page_size = 100000
            else:
                PageNumberPagination.page_size = page_items
            if uid is not None:
                return self.retrieve(request, *args, **kwargs)
            return self.list(request, *args, **kwargs)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def TotalProfilesView(request, *args, **kwargs):
    """
    DRF api view
    """
    if str(request.user) == "Arena":
        instances = Profile.objects.all()
        total_profiles = instances.count() if instances else 0
        data = {
            'total_profiles': total_profiles,
        }

        return Response(data)
    else:
        return Response({'total_profiles': 100})


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def TotalPersonalizedView(request, *args, **kwargs):
    if str(request.user) == "Arena":
        question_instances = Personalized_test_question.objects.all()
        answer_instances = Personalized_test_answer.objects.all()

        data = {
            "total_questions": question_instances.count() if question_instances else 0,
            "total_answers": answer_instances.count() if answer_instances else 0
        }

        return Response(data)
    else:
        return Response({"total_questions": 10, "total_answers": 10})


class PersonalizedQuestions(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Personalized_test_question.objects.all()[::-1]
    serializer_class = PersonalizedQuestionsSerializers
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, JWTAuthentication]

    def post(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            print(request.data)
            title = request.data.get("title")
            description = request.data.get("description")
            type = request.data.get("questiontype")
            date_time = request.data.get("time")
            for filename, file in request.FILES.items():
                image = request.FILES[filename].file

            cloudinary_response = cloudinary.uploader.upload(image, folder="BotPanel", unique_filename=True,
                                                             overwrite=False)
            print("image uploaded successfully!")
            image_url = cloudinary_response['url']

            form = PersonalizedTestQuestion(
                {"title": title, "description": description, "image": image_url, "type": type, "time": date_time})
            if form.is_valid():
                print(form.is_valid())
                form.save()
            print(form.errors)

            return Response({"data": "i got your response bro"})
        else:
            return Response({"error": "Guests can't post questions"}, status=401)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def PersonalizedQuestionsTwo(request, *args, **kwargs):
    if str(request.user) == "Arena":
        queryset = Personalized_test_question.objects.all()[::-1]
        serialized_data = PersonalizedQuestionsSerializers(queryset, many=True)
        if serialized_data:
            return Response(serialized_data.data)
    else:
        queryset = Personalized_test_question.objects.all()[0:5]
        serialized_data = PersonalizedQuestionsSerializers(queryset, many=True)
        if serialized_data:
            return Response(serialized_data.data)


class PersonalizedAnswers(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Personalized_test_answer.objects.all()
    serializer_class = PersonalizedAnswersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, JWTAuthentication]

    def get(self, request, *args, **kwargs):
        if str(request.user) == "Arena":
            question_id = request.query_params.get("question_id")
            if question_id:
                queryset = self.queryset.filter(question_id__iexact=int(question_id))
                serialized_data = PersonalizedAnswersSerializer(queryset, many=True).data
                return Response(serialized_data)

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
def LuckyBotRecord(request, *args, **kwargs):
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
        queryset = Record.objects.all().exclude(date=None)[0:30]
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
def BotInformation(request, *args, **kwargs):
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
        queryset = BotInfo.objects.all()[0:30]
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
