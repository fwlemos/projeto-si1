from rest_framework import serializers

from ProjetoSI_App.models.folder import Folder


class FolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folder
        fields = ('name', 'user', 'parent')


class FolderSerializerID(serializers.ModelSerializer):
    class Meta:
        model = Folder

