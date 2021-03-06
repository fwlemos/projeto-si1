# coding=utf-8
from allauth.account.models import EmailAddress
from django.shortcuts import get_object_or_404

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from ProjetoSI_App.permission_check import check_token_permission


class UserByTokenIDHandler(APIView):

    def get(self, request, user_token):

        response = check_token_permission(request, user_token)

        if response.status_code == 200:
            token = get_object_or_404(Token, key=user_token)

            data = {
                'user_id': token.user.id
            }
            return Response(status=200, data=data)
        return response
