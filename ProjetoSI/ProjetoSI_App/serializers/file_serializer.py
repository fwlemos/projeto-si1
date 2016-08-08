from rest_framework import serializers

from ProjetoSI_App.models.file import File


class FileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(max_length=None, required=False, use_url=True)

    class Meta:
        model = File
        fields = ('name', 'user', 'content')


class FileSerializerID(serializers.ModelSerializer):
    class Meta:
        model = File

