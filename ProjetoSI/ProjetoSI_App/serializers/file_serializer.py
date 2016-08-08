from rest_framework import serializers

from ProjetoSI_App.models.file import File


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ('name', 'user', 'content')


class FileSerializerID(serializers.ModelSerializer):
    class Meta:
        model = File

