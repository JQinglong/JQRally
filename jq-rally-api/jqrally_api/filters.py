import django_filters
from .models import Event


class EventFilter(django_filters.rest_framework.FilterSet):
    """
    Eventのfilter
    """
    dispStart = django_filters.DateTimeFilter(field_name="disp_start_date", lookup_expr='lte')
    dispEnd = django_filters.DateTimeFilter(field_name="disp_end_date", lookup_expr='gte')

    class Meta:
        model = Event
        fields = ['dispStart', 'dispEnd']