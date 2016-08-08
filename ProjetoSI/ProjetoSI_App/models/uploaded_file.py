from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from ProjetoSI_App.string_constants import APP_LABEL, DB_TABLE, UPLOADED_FILE_DIRECTORY, UPLOADED_FILE_UNICODE


def upload_path(instance, filename):
    return UPLOADED_FILE_DIRECTORY.format(instance.user.username, filename)


class UploadedFile(models.Model):

    class Meta:
        app_label = APP_LABEL
        db_table = DB_TABLE % 'uploaded_file'

    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user')
    file = models.FileField(upload_to=upload_path, db_column='file')

    def __unicode__(self):
        return UPLOADED_FILE_UNICODE % self.file.name
