from django.db import models
from django.contrib.auth.models import User


class ModelEquipment(models.Model):  # модель техники
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модель техники'

    def __str__(self):
        return self.name


class EngineModel(models.Model):  # модель двигателя
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модель двигателя'

    def __str__(self):
        return self.name


class TransmissionModel(models.Model):  # модель трансмиссии
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модель трансмиссии'

    def __str__(self):
        return self.name


class ModelDriveAxle(models.Model):  # модель ведущего моста
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модель ведущего моста'

    def __str__(self):
        return self.name


class ControlledBridgeModel(models.Model):  # модель управляемого моста
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модель управляемого моста'

    def __str__(self):
        return self.name


class TypeMaintenance(models.Model):  # вид ТО
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Вид ТО'

    def __str__(self):
        return self.name


class FailureNode(models.Model):  # Узел отказа
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Узел отказа'
        verbose_name_plural = 'Узел отказа'

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):  # способ восстановления
    name = models.CharField(max_length=40)
    description = models.TextField()

    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способ восстановления'

    def __str__(self):
        return self.name


class Client(models.Model):  # справочник пользователей с соответствующими правами
    name = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name


class ServiceCompany(models.Model):  # справочник пользователей с соответствующими правами
    name = models.CharField(max_length=50)
    description = models.TextField()

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисная компания'

    def __str__(self):
        return self.name


class Machine(models.Model):  # машина
    machine_SN = models.CharField(max_length=40)  # зав № машины
    model_equipment = models.ForeignKey(ModelEquipment, on_delete=models.CASCADE)  # модель техники
    engine_model = models.ForeignKey(EngineModel, on_delete=models.CASCADE)  # модель двигателя
    engine_SN = models.CharField(max_length=40)  # зав № двигателя
    transmission_model = models.ForeignKey(TransmissionModel, on_delete=models.CASCADE)  # модель трансмиссии
    transmission_SN = models.CharField(max_length=40)  # зав № трансмиссии
    drive_axle_model = models.ForeignKey(ModelDriveAxle, on_delete=models.CASCADE)  # модель ведущего моста
    drive_axle_SN = models.CharField(max_length=40)  # зав № ведущего моста
    # модель управляемого моста
    controlled_bridge_model = models.ForeignKey(ControlledBridgeModel, on_delete=models.CASCADE)
    controlled_bridge_SN = models.CharField(max_length=40)  # зав № управляемого моста
    delivery_contract = models.CharField(max_length=40)  # договор поставки №, дата
    shipping_date = models.DateField()  # дата отгрузки с завода
    consignee = models.CharField(max_length=64)  # грузополучатель (конечный потребитель)
    delivery_address = models.CharField(max_length=256)  # адрес поставки (эксплуатации)
    equipment = models.CharField(max_length=256)  # комплектация (доп опции)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)  # клиент
    service_company = models.ForeignKey(ServiceCompany, on_delete=models.CASCADE)  # сервисная компания

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машина'

    def __str__(self):
        return self.machine_SN


class Maintenance(models.Model):  # TO
    # машина (база данных машин)
    car = models.ForeignKey(Machine, verbose_name='Зав. № машины', on_delete=models.CASCADE)
    type = models.ForeignKey(TypeMaintenance, verbose_name='Вид ТО', on_delete=models.CASCADE)  # вид ТО
    date = models.DateField(verbose_name='Дата проведения ТО')  # дата проведения ТО
    development = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час')  # наработка, м/час
    work_order_number = models.CharField(max_length=40, verbose_name='№ заказ-наряда')  # № заказ-наряда
    work_order_date = models.DateField(verbose_name='дата заказ-наряда')  # дата заказ-наряда
    # сервисная компания
    service_company = models.ForeignKey(ServiceCompany, verbose_name='Сервисная компания', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'ТО'
        verbose_name_plural = 'ТО'
        ordering = ('car',)

    def __str__(self):
        return self.work_order_number


class Complaints(models.Model):  # рекламация
    date_refusal = models.DateField(verbose_name='Дата отказа')  # дата отказа
    development = models.PositiveIntegerField(default=0, verbose_name='Наработка, м/час', )  # наработка, м/час
    failure_node = models.ForeignKey(FailureNode, verbose_name='Узел отказа', on_delete=models.CASCADE)  # узел отказа
    description_failure = models.TextField(verbose_name='Описание отказа')  # описание отказа
    # способ восстановления
    recovery_method = models.ForeignKey(RecoveryMethod, verbose_name='Способ восстановления', on_delete=models.CASCADE)
    used_spare_parts = models.TextField(verbose_name='Используемые запасные части')  # используемые запасные части
    date_restoration = models.DateField(verbose_name='Дата восстановления')  # дата восстановления
    downtime = models.IntegerField(default=0, verbose_name='Время простоя техники')  # время простоя техники
    # машина (база данных машин)
    machine = models.ForeignKey(Machine, verbose_name='Зав. № машины', on_delete=models.CASCADE)
    # сервисная компания
    service_company = models.ForeignKey(ServiceCompany, verbose_name='Сервисная компания', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламация'

    def __str__(self):
        return self.description_failure
