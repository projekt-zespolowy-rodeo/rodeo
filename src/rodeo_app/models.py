from django.db import models
from django.contrib.auth.models import User

class Game(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    genre = models.CharField(max_length=50)
