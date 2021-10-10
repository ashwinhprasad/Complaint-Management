from rest_framework import serializers
from .models import ComplaintModel

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplaintModel
        fields = "__all__"