from django.db.models import Q
from django.shortcuts import render, HttpResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from django.db.models import Sum
from rest_framework import generics, mixins, permissions, authentication

from rest_framework.pagination import PageNumberPagination

from .models import Profile, TodayLuck, Events, Inventory, Personalized_test_question, Personalized_test_answer
from .serializers import ProfileSerializer, EventSerializer, TodayLuckSerializer, PersonalizedQuestionsSerializers, PersonalizedAnswersSerializer

# Create your views here.


def testfun(request):
    return HttpResponse(request, "test view is called!")


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([authentication.SessionAuthentication, JWTAuthentication])
def total_today_luck(request, *args, **kwargs):
    instances = TodayLuck.objects.all()
    total_today_luck = instances.count() if instances else 0

    data = {
        'total_today_luck': total_today_luck,
    }

    return Response(data)


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

    return Response(data)


class EventsMixinView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
):
    queryset = Events.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, JWTAuthentication]
    pagination_class = PageNumberPagination
    lookup_field = 'id'
    PageNumberPagination.page_size = 20
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['storage']

    def get(self, request, *args, **kwargs):
        page_items = request.query_params.get("pageitems", 10)
        if page_items == "all":
            PageNumberPagination.page_size = 100000
        else:
            PageNumberPagination.page_size = page_items

        inventory_id = kwargs.get("id")
        if inventory_id is not None:
            return self.retrieve(request, *args, **kwargs)

        search_for = kwargs.get("search")
        data = {
            'inventories': [],
        }

        # if search_for:
        #     q_objects = Q()
        #     for word in search_for:
        #         q_objects &= Q(storage__icontains=word)
        #
        #     instances = Events.objects.filter(q_objects)

        q_objects = Q()

        search_for = request.query_params.get("searchfor", "")
        filter_query = request.query_params.get("filter", "")

        if search_for:
            instances = Events.objects.all()
            for word in search_for.split():
                instances = instances.objects.filter(storage__icontains=word)
                # q_objects &= Q(storage__icontains=word)
        else:
        # Initial queryset filtering
            instances = Events.objects.filter(q_objects)

        if filter_query == "true":
            instances = instances.exclude(storage="")

        if instances.exists():
            paginator = PageNumberPagination()
            paginated_instances = paginator.paginate_queryset(instances, request)
            serialized_data = EventSerializer(paginated_instances, many=True).data
            # data["inventories"] = EventSerializer(instances, many=True).data
            # return Response(data["inventories"])
            return paginator.get_paginated_response(serialized_data)

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
        return self.list(request, *args, **kwargs)


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
    instances = Profile.objects.all()
    total_profiles = instances.count() if instances else 0
    data = {
        'total_profiles': total_profiles,
    }

    return Response(data)


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def TotalPersonalizedView(request, *args, **kwargs):
    question_instances = Personalized_test_question.objects.all()
    answer_instances = Personalized_test_answer.objects.all()

    data = {
        "total_questions": question_instances.count() if question_instances else 0,
        "total_answers": answer_instances.count() if answer_instances else 0
    }

    return Response(data)


class PersonalizedQuestions(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Personalized_test_question.objects.all()
    serializer_class = PersonalizedQuestionsSerializers
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [authentication.SessionAuthentication, JWTAuthentication]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class PersonalizedAnswers(
    mixins.ListModelMixin,
    generics.GenericAPIView
):
    queryset = Personalized_test_answer
    serializer_class = PersonalizedAnswersSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication, JWTAuthentication]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)