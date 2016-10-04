from rest_framework.views import APIView
from rest_framework.response import Response

from ProjetoSI_App.serializers.folder_serializer import *
from ProjetoSI_App.models.file import *
from ProjetoSI_App.serializers.file_serializer import FileSerializerID
from ProjetoSI_App.permission_check import check_user_permission


class FolderByUserIDHandler(APIView):

    def get(self, request, user_id):
        folders = Folder.objects.filter(user=user_id)
        serializer = FolderSerializerID(folders, many=True)
        return Response(serializer.data)

    def post(self, request, user_id):
        response = check_user_permission(request, user_id)

        if response.status_code == 200:
            request.data['user'] = user_id
            serializer = FolderSerializer(data=request.data)
            if serializer.is_valid():
                folder = serializer.save()

                data = {
                    'folder_id': folder.pk
                }

                return Response(status=201, data=data)
            return Response(serializer.errors, status=400)
        return response

class FolderByIDHandler(APIView):

   def get(self, request, user_id, folder_id):
       files = File.objects.filter(folder=folder_id)
       serializer = FileSerializerID(files, many=True)
       return Response(serializer.data)

   def patch(self, request, user_id, folder_id):
       response = check_user_permission(request, user_id)

       if response.status_code == 200:
           folder = Folder.objects.get(user=user_id, pk=folder_id)
           data = request.data
           data['user'] = user_id

           serializer = FolderSerializer(instance=folder, data=data, partial=True)
           if serializer.is_valid():
               folder = serializer.save()

               data = {
                 'folder_id': folder.pk
               }
               return Response(status=201, data=data)
           return Response(serializer.errors, status=400)
       return response