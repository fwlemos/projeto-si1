from django.conf.urls import url

from authentication.views.index_view import index

urlpatterns = [
    url(r'^$', index, name='index'),
]