from django.conf.urls import url

from ProjetoSI-App.views.index_view import index

urlpatterns = [
    url(r'^$', index, name='index'),
]