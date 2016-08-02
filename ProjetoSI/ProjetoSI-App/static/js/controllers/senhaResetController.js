(function() {
    'use strict';

    app.controller('senhaResetController', ['$rootScope', '$state', '$http', function($rootScope, $state, $http) {
        var ctrl = this;

        this.resetSenha = function(email) {
            $http({
                url: 'rest-auth/password/reset/',
                method: 'POST',
                data: {
                    email: email
                }
            }).then(function(response) {
                // mostrar notificação
                $state.go('login');
            }, function (data) {
                ctrl.hasError = true;
            });
        };

        this.confirmSenha = function(senha1, senha2) {
            $http.post('rest-auth/password/reset/confirm/', {
                new_password1: senha1,
                new_password2: senha2,
                uid: $state.params.uid,
                token: $state.params.token
            }).then(function(response) {
                // mostrar notificação
                $state.go('login');
            }, function(response) {
                console.log(response);
            });
        };
    }]);
})();
