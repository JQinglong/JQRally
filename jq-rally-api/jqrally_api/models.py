from django.db import models

# Create your models here.
class Memo(models.Model):
    title = models.CharField(max_length=64)
    memo = models.TextField(max_length=1024)