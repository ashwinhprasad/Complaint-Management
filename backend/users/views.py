from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from knox.models import AuthToken
from django.contrib.auth import authenticate

# Create your views here.

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = AuthToken.objects.create(user)[1]
        return Response({
            'user':UserSerializer(user).data,
            'token':token
        })

@api_view(['Post'])
def login(request):
    email = request.data['email']
    password = request.data['password']
    user  = authenticate(email=email,password=password)
    if not user:
        return Response("Invalid Credentials")
    try:
        objs = AuthToken.objects.filter(user=user.id)
        for obj in objs:
            obj.delete()
    except:
        pass
    token = AuthToken.objects.create(user)[1]
    return Response({
        "user":UserSerializer(user).data,
        "token":token
    })