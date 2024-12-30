from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.serializers import Serializer, CharField, ModelSerializer
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined', 'groups']


class IssueTokenRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)


class TokenSeriazliser(ModelSerializer):

    class Meta:
        model = Token
        fields = ['key']


class ModelEquipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ModelEquipment
        fields = ['id', 'name', 'description', ]


class EngineModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EngineModel
        fields = ['id', 'name', 'description', ]


class TransmissionModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = ['id', 'name', 'description', ]


class ModelDriveAxleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ModelDriveAxle
        fields = ['id', 'name', 'description', ]


class ControlledBridgeModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ControlledBridgeModel
        fields = ['id', 'name', 'description', ]


class TypeMaintenanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TypeMaintenance
        fields = ['id', 'name', 'description', ]


class FailureNodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FailureNode
        fields = ['id', 'name', 'description', ]


class RecoveryMethodSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = ['id', 'name', 'description', ]


class ClientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'name', 'description', ]


class ServiceCompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ServiceCompany
        fields = ['id', 'name', 'description', ]


class MachineSerializer(serializers.HyperlinkedModelSerializer):
    model_equipment = serializers.StringRelatedField()
    engine_model = serializers.StringRelatedField()
    transmission_model = serializers.StringRelatedField()
    drive_axle_model = serializers.StringRelatedField()
    controlled_bridge_model = serializers.StringRelatedField()
    client = serializers.StringRelatedField()
    service_company = serializers.StringRelatedField()

    class Meta:
        model = Machine
        fields = ['id',
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


class MaintenanceSerializer(serializers.HyperlinkedModelSerializer):
    type = serializers.StringRelatedField()
    car = serializers.StringRelatedField()
    service_company = serializers.StringRelatedField()

    class Meta:
        model = Maintenance
        fields = ['id',
                  'car',
                  'type',
                  'date',
                  'development',
                  'work_order_number',
                  'work_order_date',
                  'service_company',
                  ]


class ComplaintsSerializer(serializers.HyperlinkedModelSerializer):
    failure_node = serializers.StringRelatedField()
    recovery_method = serializers.StringRelatedField()
    machine = serializers.StringRelatedField()
    service_company = serializers.StringRelatedField()

    class Meta:
        model = Complaints
        fields = ['id',
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
