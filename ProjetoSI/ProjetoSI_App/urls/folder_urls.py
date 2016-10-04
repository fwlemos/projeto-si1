from django.conf.urls import url

from ProjetoSI_App.views.folder_view import *

urlpatterns = [
    url(r'^folder-create/(?P<user_id>\d+)/$', FolderByUserIDHandler.as_view()),
    url(r'^folder-create/(?P<user_id>\d+)/(?P<folder_id>\d+)/$', FolderByIDHandler.as_view())
]
