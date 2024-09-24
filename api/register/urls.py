from django.urls import path
from . import views

urlpatterns = [
    path('users', views.userView, name='userView'),
    path('users/<int:id>', views.userDetailView, name='userDetailView'),
    path('login', views.loginView, name='loginView'),
    path('logout', views.logoutView, name='logoutView'),
    path('password-change', views.passwordChangeView, name='password-changeView'),
    path('password-reset', views.passwordResetView, name='password-resetView'),
    path('password-reset/<str:link>', views.passwordResetDoneView, name='passwordResetDoneView'),
]