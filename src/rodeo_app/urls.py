from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='rodeo-home'),
    path('about/', views.about, name='rodeo-about')
]