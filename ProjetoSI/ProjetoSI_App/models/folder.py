from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from ProjetoSI_App.string_constants import APP_LABEL, DB_TABLE, FOLDER_UNICODE


class Folder(models.Model):

    class Meta:
        app_label = APP_LABEL
        db_table = DB_TABLE % 'folder'

    parent = models.ForeignKey('self', verbose_name='parent', null=True, blank=True,
                               related_name='children')
    name = models.CharField(_('name'), max_length=255)

    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user')

    def __unicode__(self):
        return FOLDER_UNICODE % self.name
