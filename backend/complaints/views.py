from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from .serializers import ComplaintSerializer
from rest_framework.response import Response
# Create your views here.

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def post_complaint(request):
    serializer = ComplaintSerializer(data=request.data)
    if serializer.is_valid():
        complaint = serializer.save()
        return Response(ComplaintSerializer(complaint).data)
    else:
        return Response("Invalid Details")
