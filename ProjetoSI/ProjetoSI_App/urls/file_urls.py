from django.conf.urls import url

from ProjetoSI_App.views.file_view import *
from ProjetoSI_App.views.uploaded_file_view import *

urlpatterns = [
    url(r'^file-upload/(?P<user_id>\d+)/$', UploadedFileByUserIDHandler.as_view()),
    url(r'^file-create/(?P<user_id>\d+)/$', FileByUserIDHandler.as_view())
]
