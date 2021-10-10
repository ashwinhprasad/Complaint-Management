from django.urls import path
from .views import register, login
from knox import views as knox_views

urlpatterns = [
    path('', register),
    path('login/',login),
    path('logout/',knox_views.LogoutView.as_view())
]