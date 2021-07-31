from django.db import models
import uuid

# Create your models here.
class Memo(models.Model):
    title = models.CharField(max_length=64)
    memo = models.TextField(max_length=1024)

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64)
    mail = models.CharField(max_length=256, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.name

class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_img = models.CharField(max_length=256, blank=True, null=True)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    disp_start_date = models.DateField(blank=True, null=True)
    disp_end_date = models.DateField(blank=True, null=True)
    admin_user = models.ForeignKey(User, on_delete=models.PROTECT)
    def __str__(self):
        return self.name

class EventSpot(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256, blank=True, null=True)
    spot_img = models.CharField(max_length=256, blank=True, null=True)
    address = models.CharField(max_length=256, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    stamp_img = models.CharField(max_length=256, blank=True, null=True)
    def __str__(self):
        return self.name

class EventUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    def __str__(self):
        return f'{self.event} {self.user}'

class UserSpot(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    spot = models.ForeignKey(EventSpot, on_delete=models.PROTECT)
    stamp = models.CharField(max_length=2, blank=True, null=True)
    def __str__(self):
        return f'{self.user} {self.spot}'

class UserSpotPhoto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    spot = models.ForeignKey(EventSpot, on_delete=models.PROTECT)
    visit_date = models.DateField(blank=True, null=True)
    photo = models.CharField(max_length=256, blank=True, null=True)
    def __str__(self):
        return f'{self.user} {self.spot}'

class UserSpotComment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    event = models.ForeignKey(Event, on_delete=models.PROTECT)
    spot = models.ForeignKey(EventSpot, on_delete=models.PROTECT)
    visit_date = models.DateField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    def __str__(self):
        return f'{self.user} {self.spot}'
