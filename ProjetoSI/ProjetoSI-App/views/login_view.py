# coding=utf-8
from django.contrib.auth import login
from django.conf import settings

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny

from rest_auth.app_settings import (TokenSerializer, LoginSerializer, create_token)
from rest_auth.models import TokenModel

from django.contrib.auth.models import User


class LoginView(GenericAPIView):
    """
    Check the credentials and return the REST Token
    if the credentials are valid and authenticated.
    Calls Django Auth login method to register User ID
    in Django session framework

    Accept the following POST parameters: username, password
    Return the REST Framework Token Object's key.
    """
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer
    token_model = TokenModel
    response_serializer = TokenSerializer

    def login(self):
        self.user = self.serializer.validated_data['user']
        self.token = create_token(self.token_model, self.user, self.serializer)
        if getattr(settings, 'REST_SESSION_LOGIN', True):
            login(self.request, self.user)

    def get_response(self):
        return Response(
            self.response_serializer(self.token).data, status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        try:
            usuario = User.objects.get(email=request.data['email'])
            request.data['username'] = usuario.username
        except:
            data = {
                "non_field_errors": [
                    "Impossível fazer login com as credenciais fornecidas."
                ]
            }
            return Response(data=data, status=400)

        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        self.login()
        return self.get_response()
