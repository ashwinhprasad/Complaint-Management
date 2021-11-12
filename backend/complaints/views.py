from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from .serializers import ComplaintSerializer
from .models import ComplaintModel
from rest_framework.response import Response
from .check_mask import detect_mask
from .check_helmet import detect_helmet

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def post_complaint(request):
    serializer = ComplaintSerializer(data=request.data)
    if serializer.is_valid():
        complaint = serializer.save()
        complaint_data = ComplaintModel.objects.all().order_by('id')
        complaint_data = complaint_data[len(complaint_data)-1]
        detect_mask(complaint_data)
        return Response(ComplaintSerializer(complaint).data)
    else:
        return Response("Invalid Details")