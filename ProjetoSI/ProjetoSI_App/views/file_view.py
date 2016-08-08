from rest_framework.views import APIView
from rest_framework.response import Response

from ProjetoSI_App.serializers.file_serializer import *
from ProjetoSI_App.permission_check import check_user_permission


class FileByUserIDHandler(APIView):

    def get(self, request, user_id):
        files = File.objects.filter(user=user_id)
        serializer = FileSerializerID(files, many=True)
        return Response(serializer.data)

    def post(self, request, user_id):
        response = check_user_permission(request, user_id)

        if response.status_code == 200:
            serializer = FileSerializer(data=request.data)
            if serializer.is_valid():
                file = serializer.save()

                data = {
                    'file_id': file.pk,
                    'file_name': file.name
                }

                return Response(status=201, data=data)
            return Response(serializer.errors, status=400)
        return response