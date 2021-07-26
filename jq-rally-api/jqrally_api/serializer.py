from rest_framework import serializers
from .models import Memo
from .models import Event
from .models import EventSpot
from .models import User
from .models import EventUser
from .models import UserSpot
from .models import UserSpotPhoto
from .models import UserSpotComment

class MemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memo
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventSpotSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    class Meta:
        model = EventSpot
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EventUserSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    user = UserSerializer()
    class Meta:
        model = EventUser
        fields = '__all__'

class UserSpotSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    spot = EventSpotSerializer()
    class Meta:
        model = UserSpot
        fields = '__all__'

class UserSpotPhotoSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    spot = EventSpotSerializer()
    class Meta:
        model = UserSpotPhoto
        fields = '__all__'

class UserSpotCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    spot = EventSpotSerializer()
    class Meta:
        model = UserSpotComment
        fields = '__all__'
