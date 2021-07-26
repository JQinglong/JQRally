from django.contrib import admin
from .models import Memo
from .models import Event
from .models import EventSpot
from .models import User
from .models import EventUser
from .models import UserSpot
from .models import UserSpotPhoto
from .models import UserSpotComment

@admin.register(Memo)
class MemoAdmin(admin.ModelAdmin):
    pass

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass

@admin.register(EventSpot)
class EventSpotyAdmin(admin.ModelAdmin):
    pass

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(EventUser)
class EventUserAdmin(admin.ModelAdmin):
    pass

@admin.register(UserSpot)
class UserSpotAdmin(admin.ModelAdmin):
    pass

@admin.register(UserSpotPhoto)
class UserSpotPhotoAdmin(admin.ModelAdmin):
    pass

@admin.register(UserSpotComment)
class UserSpotCommentAdmin(admin.ModelAdmin):
    pass
