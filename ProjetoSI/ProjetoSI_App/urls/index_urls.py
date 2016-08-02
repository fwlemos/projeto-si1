from django.conf.urls import url

from ProjetoSI_App.views.index_view import index

urlpatterns = [
    url(r'^$', index, name='index'),
]