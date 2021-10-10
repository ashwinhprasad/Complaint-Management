from django.urls import path
from .views import post_complaint

urlpatterns = [
    path('',post_complaint)
]