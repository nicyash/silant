"""
URL configuration for silant project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from silant_app.views import *

router = routers.DefaultRouter()
router.register(r'service_companies', ServiceCompanyViewset)
router.register(r'model_equipment', ModelEquipmentViewset)
router.register(r'engine_models', EngineModelViewset)
router.register(r'transmission_models', TransmissionModelViewset)
router.register(r'model_drive_axle', ModelDriveAxleViewset)
router.register(r'controlled_bridge_models', ControlledBridgeModelViewset)
router.register(r'type_maintenance', TypeMaintenanceViewset)
router.register(r'failure_nodes', FailureNodeViewset)
router.register(r'recovery_methods', RecoveryMethodViewset)
router.register(r'clients', ClientViewset)
router.register(r'machines', MachineViewset)
router.register(r'maintenances', MaintenanceViewset)
router.register(r'complaints', ComplaintsViewset)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/user', user, name='user'),
    path('api/login', issue_token, name='issue_token'),
    path('api/logout', UserLogout.as_view(), name='logout'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
