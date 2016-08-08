from rest_framework import serializers

from ProjetoSI_App.models.uploaded_file import UploadedFile


class UploadedFileSerializer(serializers.ModelSerializer):
    file = serializers.FileField(max_length=None, required=False, use_url=True)

    class Meta:
        model = UploadedFile
        fields = ('file', 'user')


class UploadedFileSerializerID(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile