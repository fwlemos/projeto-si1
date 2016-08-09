from django.conf.urls import url, include

from ProjetoSI_App.views.login_view import *
from ProjetoSI_App.views.user_view import *

urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),

    url(r'^user-id/(?P<user_token>\w+)/$', UserByTokenIDHandler.as_view()),
    url(r'^login/$', LoginView.as_view(), name='rest_login')
]
