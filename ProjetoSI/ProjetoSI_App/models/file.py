from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from ProjetoSI_App.string_constants import APP_LABEL, DB_TABLE, FILE_UNICODE
from ProjetoSI_App.models.folder import Folder

class File(models.Model):

    class Meta:
        app_label = APP_LABEL
        db_table = DB_TABLE % 'file'

    name = models.CharField(blank=False, max_length=50, db_column='name')
    content = models.TextField(blank=True, db_column='content')
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user')
    folder = models.ForeignKey(Folder, verbose_name='folder', related_name='all_files',
                               null=True, blank=True)

    def __unicode__(self):
        return FILE_UNICODE % self.name
