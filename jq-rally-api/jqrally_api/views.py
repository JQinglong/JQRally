import django_filters

from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, filters
from .models import Memo
from .serializer import MemoSerializer
from .models import Event
from .serializer import EventSerializer
from .models import EventSpot
from .serializer import EventSpotSerializer
from .models import User
from .serializer import UserSerializer
from .models import EventUser
from .serializer import EventUserSerializer
from .models import UserSpot
from .serializer import UserSpotSerializer
from .models import UserSpotPhoto
from .serializer import UserSpotPhotoSerializer
from .models import UserSpotComment
from .serializer import UserSpotCommentSerializer


def index(request):
    return HttpResponse("Hello, world.")

class MemoViewSet(viewsets.ModelViewSet):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventSpotViewSet(viewsets.ModelViewSet):
    queryset = EventSpot.objects.all()
    serializer_class = EventSpotSerializer
    filter_fields = ('event', )

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EventUserViewSet(viewsets.ModelViewSet):
    queryset = EventUser.objects.all()
    serializer_class = EventUserSerializer
    filter_fields = ('event', 'user', )

class UserSpotViewSet(viewsets.ModelViewSet):
    queryset = UserSpot.objects.all()
    serializer_class = UserSpotSerializer
    filter_fields = ('user', 'event', )

class UserSpotPhotoViewSet(viewsets.ModelViewSet):
    queryset = UserSpotPhoto.objects.all()
    serializer_class = UserSpotPhotoSerializer
    filter_fields = ('user', 'event', )

class UserSpotCommentViewSet(viewsets.ModelViewSet):
    queryset = UserSpotComment.objects.all()
    serializer_class = UserSpotCommentSerializer
    filter_fields = ('user', 'event', )
