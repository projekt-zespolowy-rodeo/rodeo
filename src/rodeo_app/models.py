from django.db import models
from django.contrib.auth.models import User

class Game(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    genre = models.TextField()
    image = models.ImageField(default='default.jpg', upload_to='images')

    def __str__(self):
        return self.title
