import django_filters
from .models import Inventory


class InventorySearchFilter(django_filters.FilterSet):
    class Meta:
        model = Inventory
        fields = ['storage']