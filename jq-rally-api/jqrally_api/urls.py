from django.urls import path

from . import views
from rest_framework import routers

urlpatterns = [
    path('', views.index, name='index'),
]

router = routers.DefaultRouter()
router.register(r'memo', views.MemoViewSet)
router.register(r'event', views.EventViewSet)
router.register(r'event_spot', views.EventSpotViewSet)
router.register(r'user', views.UserViewSet)
router.register(r'event_user', views.EventUserViewSet)
router.register(r'user_spot', views.UserSpotViewSet)
router.register(r'user_spot_photo', views.UserSpotPhotoViewSet)
router.register(r'user_spot_comment', views.UserSpotCommentViewSet)
