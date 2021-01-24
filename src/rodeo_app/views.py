from django.shortcuts import render
from django.shortcuts import redirect
from .models import Game


def home(request):
    context = {
        'games': Game.objects.all()
    }
    if request.user.is_authenticated:
        return render(request, 'rodeo_app/home.html', context)
    else:
        return redirect('/register')


def about(request):
    return render(request, 'rodeo_app/about.html')
