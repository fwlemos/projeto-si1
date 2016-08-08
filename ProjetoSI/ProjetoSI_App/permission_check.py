# coding=utf-8
from rest_framework.response import Response


def check_user_permission(request, user_id):

    if str(request.user.id) != str(user_id):
        data = {'Mensagem': "Usuario invalido"}
        return Response(data=data, status=403)
    return Response(status=200)


def check_token_permission(request, user_token):
    print
    if str(request.user.auth_token) != str(user_token):
        data = {'Mensagem': "Usuario invalido"}
        return Response(data=data, status=403)
    return Response(status=200)
