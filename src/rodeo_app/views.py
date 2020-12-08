from django.shortcuts import render

games = [
    {
        'title': 'Kalambury',
        'description': 'Celem zabawy jest odgadywanie haseł. W każdej kolejce poszczególna drużyna odgaduje hasło lub hasła, przedstawiane przez jednego członka grupy. Z tego powodu często wymaga się, aby drużyna składała się z co najmniej 3 osób',
        'genere': 'Gra Towarzyska'
    
    },
    {
        'title': 'Chińczyk',
        'description': 'Gra dla 2-4 osób, w której celem graczy jest przejechanie dookoła planszy czterema pionkami z pozycji początkowych na końcowe. Pierwszy gracz, który tego dokona, wygrywa.',
        'genere': 'Gra Towarzyska'
    },
      {
        'title': 'Kalambury',
        'description': 'Celem zabawy jest odgadywanie haseł. W każdej kolejce poszczególna drużyna odgaduje hasło lub hasła, przedstawiane przez jednego członka grupy. Z tego powodu często wymaga się, aby drużyna składała się z co najmniej 3 osób',
        'genere': 'Gra Towarzyska'
    
    },
    {
        'title': 'Chińczyk',
        'description': 'Gra dla 2-4 osób, w której celem graczy jest przejechanie dookoła planszy czterema pionkami z pozycji początkowych na końcowe. Pierwszy gracz, który tego dokona, wygrywa.',
        'genere': 'Gra Towarzyska'
    }
]

def home(request):
    context = {
        'games': games
    }
    return render(request, 'rodeo_app/home.html', context)


def about(request):
    return render(request, 'rodeo_app/about.html')
