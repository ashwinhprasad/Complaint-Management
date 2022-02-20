from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from .serializers import ComplaintSerializer
from .models import ComplaintModel
from rest_framework.response import Response
from .check_mask import detect_mask
from .check_helmet import detect_helmet
from .check_numberplate import detect_numberplate

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def post_complaint(request):
    serializer = ComplaintSerializer(data=request.data)
    if serializer.is_valid():
        complaint = serializer.save()
        complaint_data = ComplaintModel.objects.all().order_by('id')
        complaint_data = complaint_data[len(complaint_data)-1]
        if ComplaintSerializer(complaint_data).data['is_mask_helmet'] == 'helmet':
            output = detect_helmet(complaint_data)
            number_plate = detect_numberplate(complaint_data)
            if output:
                output = "Helmet Detected"
            else:
                output = "Helmet not detected"
            
        elif ComplaintSerializer(complaint_data).data['is_mask_helmet'] == 'mask':
            output = detect_mask(complaint_data)
            number_plate = None
            if output:
                output = "Mask not detected"
            else:
                output = "Mask detected"
        return Response({
            'complaint':ComplaintSerializer(complaint).data,
            'output':output,
            'number_plate':number_plate
        })
    else:
        return Response("Invalid Details")