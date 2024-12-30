from rest_framework import viewsets, permissions, status
import django_filters
from .serializers import *
from .models import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView


@api_view(['POST'])
@permission_classes([AllowAny])
def issue_token(request: Request):
    serializer = IssueTokenRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        try:
            token = Token.objects.get(user=authenticated_user)
        except Token.DoesNotExist:
            token = Token.objects.create(user=authenticated_user)
        return Response(TokenSeriazliser(token).data)
    else:
        return Response(serializer.errors, status=400)


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class ServiceCompanyViewset(viewsets.ModelViewSet):
    queryset = ServiceCompany.objects.all()
    serializer_class = ServiceCompanySerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class ModelEquipmentViewset(viewsets.ModelViewSet):
    queryset = ModelEquipment.objects.all()
    serializer_class = ModelEquipmentSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class EngineModelViewset(viewsets.ModelViewSet):
    queryset = EngineModel.objects.all()
    serializer_class = EngineModelSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class TransmissionModelViewset(viewsets.ModelViewSet):
    queryset = TransmissionModel.objects.all()
    serializer_class = TransmissionModelSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class ModelDriveAxleViewset(viewsets.ModelViewSet):
    queryset = ModelDriveAxle.objects.all()
    serializer_class = ModelDriveAxleSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class ControlledBridgeModelViewset(viewsets.ModelViewSet):
    queryset = ControlledBridgeModel.objects.all()
    serializer_class = ControlledBridgeModelSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class TypeMaintenanceViewset(viewsets.ModelViewSet):
    queryset = TypeMaintenance.objects.all()
    serializer_class = TypeMaintenanceSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class FailureNodeViewset(viewsets.ModelViewSet):
    queryset = FailureNode.objects.all()
    serializer_class = FailureNodeSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class RecoveryMethodViewset(viewsets.ModelViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class ClientViewset(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ["name"]


class MachineViewset(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
                  'id',
                  'machine_SN',
                  'model_equipment',
                  'engine_model',
                  'engine_SN',
                  'transmission_model',
                  'transmission_SN',
                  'drive_axle_model',
                  'drive_axle_SN',
                  'controlled_bridge_model',
                  'controlled_bridge_SN',
                  'delivery_contract',
                  'shipping_date',
                  'consignee',
                  'delivery_address',
                  'equipment',
                  'client',
                  'service_company',
    ]
    ordering_fields = ["-shipping_date"]
    ordering = ["-shipping_date"]


# @permission_classes([IsAuthenticated])
class MaintenanceViewset(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = ['id',
                        'car',
                        'type',
                        'date',
                        'development',
                        'work_order_number',
                        'work_order_date',
                        'service_company',]
    ordering_fields = ['-date']
    ordering = ['-date']


# @permission_classes([IsAuthenticated])
class ComplaintsViewset(viewsets.ModelViewSet):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer
    filter_backends = [filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend]
    filterset_fields = [
                  'id',
                  'date_refusal',
                  'development',
                  'failure_node',
                  'description_failure',
                  'recovery_method',
                  'used_spare_parts',
                  'date_restoration',
                  'downtime',
                  'machine',
                  'service_company',
                    ]
    ordering_fields = ['-date_refusal']
    ordering = ['-date_refusal']
