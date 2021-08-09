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
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    spot = EventSpotSerializer(read_only=True)
    spot_id = serializers.PrimaryKeyRelatedField(queryset=EventSpot.objects.all(), write_only=True)
    event = EventSerializer(read_only=True)
    event_id = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), write_only=True)
    class Meta:
        model = UserSpotPhoto
        fields = '__all__'
    def create(self, validated_date):
        validated_date['user'] = validated_date.get('user_id', None)
        if validated_date['user'] is None:
            raise serializers.ValidationError("user not found.") 
        del validated_date['user_id']

        validated_date['spot'] = validated_date.get('spot_id', None)
        if validated_date['spot'] is None:
            raise serializers.ValidationError("spot not found.") 
        del validated_date['spot_id']

        validated_date['event'] = validated_date.get('event_id', None)
        if validated_date['event'] is None:
            raise serializers.ValidationError("event not found.") 
        del validated_date['event_id']

        return UserSpotPhoto.objects.create(**validated_date)

class UserSpotCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    spot = EventSpotSerializer()
    event = EventSerializer()
    class Meta:
        model = UserSpotComment
        fields = '__all__'
