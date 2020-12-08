from django.shortcuts import render
from .models import Game


def home(request):
    context = {
        'games': Game.objects.all()
    }
    return render(request, 'rodeo_app/home.html', context)


def about(request):
    return render(request, 'rodeo_app/about.html')
