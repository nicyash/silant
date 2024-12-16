from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class ModelEquipment(models.Model):  # модель техники
    name = models.CharField(max_length=40)
    description = models.TextField()

    def get_absolute_url(self):
        return reverse('model_equipment_detail', args=[str(self.id)])

    def __str__(self):
        return self.name


class EngineModel(models.Model):  # модель двигателя
    name = models.CharField(max_length=40)
    description = models.TextField()

    def get_absolute_url(self):
        return reverse('engine_model_detail', args=[str(self.id)])

    def __str__(self):
        return self.name


class TransmissionModel(models.Model):  # модель трансмиссии
    name = models.CharField(max_length=40)
    description = models.TextField()

    def get_absolute_url(self):
        return reverse('transmission_model_detail', args=[str(self.id)])

    def __str__(self):
        return self.name


class ModelDriveAxle(models.Model):  # модель ведущего моста
    name = models.CharField(max_length=40)
    description = models.TextField()

    def get_absolute_url(self):
        return reverse('model_drive_axle_detail', args=[str(self.id)])

    def __str__(self):
        return self.name


class ControlledBridgeModel(models.Model):  # модель управляемого моста
    name = models.CharField(max_length=40)
    description = models.TextField()

    def get_absolute_url(self):
        return reverse('controlled_bridge_model_detail', args=[str(self.id)])

    def __str__(self):
        return self.name


class TypeMaintenance(models.Model):  # вид ТО
    name = models.CharField(max_length=40)
    description = models.TextField()

    def __str__(self):
        return self.name


class FailureNode(models.Model):  # Узел отказа
    name = models.CharField(max_length=40)
    description = models.TextField()

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):  # способ восстановления
    name = models.CharField(max_length=40)
    description = models.TextField()

    def __str__(self):
        return self.name


class Client(models.Model):  # справочник пользователей с соответствующими правами
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_client')
    title = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.title


class ServiceCompany(models.Model):  # справочник пользователей с соответствующими правами
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.title


class Machine(models.Model):  # машина
    machine_SN = models.CharField(max_length=40)  # зав № машины
    model_equipment = models.ForeignKey(ModelEquipment, on_delete=models.CASCADE)  # модель техники
    engine_model = models.ForeignKey(EngineModel, on_delete=models.CASCADE)  # модель двигателя
    engine_SN = models.CharField(max_length=40)  # зав № двигателя
    transmission_model = models.ForeignKey(TransmissionModel, on_delete=models.CASCADE)  # модель трансмиссии
    transmission_SN = models.CharField(max_length=40)  # зав № трансмиссии
    drive_axle_model = models.ForeignKey(ModelDriveAxle, on_delete=models.CASCADE)  # модель ведущего моста
    drive_axle_SN = models.CharField(max_length=40)  # зав № ведущего моста
    controlled_bridge_model = models.ForeignKey(ControlledBridgeModel, on_delete=models.CASCADE)  # модель управляемого моста
    controlled_bridge_SN = models.CharField(max_length=40)  # зав № управляемого моста
    delivery_contract = models.CharField(max_length=40)  # договор поставки №, дата
    shipping_date = models.DateField()  # дата отгрузки с завода
    consignee = models.CharField(max_length=64)  # грузополучатель (конечный потребитель)
    delivery_address = models.CharField(max_length=256)  # адрес поставки (эксплуатации)
    equipment = models.CharField(max_length=256)  # комплектация (допю опции)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)  # клиент
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)  # сервисная компания

    def get_absolute_url(self):
        return reverse('forklift_list', args=[str(self.id)])

    def __str__(self):
        return self.machine_SN


class Maintenance(models.Model):  # TO
    car = models.ForeignKey(Machine, verbose_name='Зав. № машины', on_delete=models.CASCADE)  # машина (база данных машин)
    type = models.ForeignKey(TypeMaintenance, verbose_name='Вид ТО', on_delete=models.CASCADE)  # вид ТО
    date = models.DateField(verbose_name='Дата проведения ТО')  # дата проведения ТО
    development = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час')  # наработка, м/час
    work_order_number = models.CharField(max_length=40, verbose_name='№ заказ-наряда')  # № заказ-наряда
    work_order_date = models.DateField(verbose_name='дата заказ-наряда')  # дата заказ-наряда
    service_company = models.ForeignKey(ServiceCompany, verbose_name='Сервисная компания', on_delete=models.CASCADE)  # сервисная компания

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.work_order_number


class Complaints(models.Model):  # рекламация
    date_refusal = models.DateField(verbose_name='Дата отказа')  # дата отказа
    development = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час', )  # наработка, м/час
    failure_node = models.ForeignKey(FailureNode, verbose_name='Узел отказа', on_delete=models.CASCADE)  # узел отказа
    description_failure = models.TextField(verbose_name='Описание отказа')  # описание отказа
    recovery_method = models.ForeignKey(RecoveryMethod, verbose_name='Способ восстановления', on_delete=models.CASCADE)  # способ восстановления
    used_spare_parts = models.TextField(verbose_name='Используемые запасные части')  # используемые запасные части
    date_restoration = models.DateField(verbose_name='Дата восстановления')  # дата восстановления
    downtime = models.IntegerField(default=0, verbose_name='Время простоя техники')  # время простоя техники
    machine = models.ForeignKey(Machine, verbose_name='Зав. № машины', on_delete=models.CASCADE)  # машина (база данных машин)
    service_company = models.ForeignKey(ServiceCompany, verbose_name='Сервисная компания', on_delete=models.CASCADE)  # сервисная компания

    class Meta:
        ordering = ['-orders_date']

    def __str__(self):
        return self.description_failure
