from django.conf.urls import url, include

from authentication.views.login_view import *
from authentication.views.user_view import UserByTokenIDHandler

urlpatterns = [
    url(r'^rest-auth/login/$', LoginView.as_view(), name='rest_login'),

    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/user-id/(?P<user_token>\w+)/$', UserByTokenIDHandler.as_view()),
]
