from django.urls import path
from . import views

urlpatterns = [
    path('', views.homeView, name='homeView'),
    path('todo', views.todoView, name='todoView'),
    path('todo/<int:id>', views.todoDetailView, name='todoDetailView')
]