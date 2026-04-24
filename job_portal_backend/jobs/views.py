from rest_framework import viewsets, status # crud status means like 400 ,200
from rest_framework.decorators import action # custom end points
from rest_framework.response import Response # json response
from django.db.models import Q # import databse models
from .models import Job, Application # convert model to json
from .serializers import JobSerializer, ApplicationSerializer

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer

    def get_queryset(self): # tells wha dat to return 
        queryset = Job.objects.filter(is_active=True)
        search = self.request.query_params.get('search', '') # reads url parameter
        job_type = self.request.query_params.get('job_type', '') # reads the jobtype
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | # matches the jobtile or region or company 
                Q(company__icontains=search) |
                Q(location__icontains=search)
            )
        if job_type:
            queryset = queryset.filter(job_type=job_type) # filetr by type full or internship
        return queryset

    @action(detail=True, methods=['get'])
    def applications(self, request, pk=None):
        job = self.get_object()
        apps = job.applications.all()
        serializer = ApplicationSerializer(apps, many=True)
        return Response(serializer.data)


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def create(self, request, *args, **kwargs):
        # Prevent duplicate applications
        email = request.data.get('applicant_email')
        job_id = request.data.get('job')
        if Application.objects.filter(applicant_email=email, job_id=job_id).exists():
            return Response(
                {'error': 'You have already applied for this job.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().create(request, *args, **kwargs)
