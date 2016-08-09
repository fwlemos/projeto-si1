(function() {
	'use strict';

	app.controller("loginController", ['$rootScope','$http', '$state', 'ngDialog', 'userService','AUTH_EVENT', function($rootScope, $http, $state, ngDialog, userService, AUTH_EVENT) {
		var ctrl = this;

		this.registraUsuario = function (user) {
			$http.post("rest-auth/registration/", user).success(function(data){
				userService.loginById(data.user, true, data.key).then(function () {
					$state.go('arquivos');
				})
			})
			.error(function(data) {
				ctrl.hasError = true;
				ctrl.errosCadastro = data;
			});
		};

		this.login = function(user) {
			userService.login(user).then(function() {
				ngDialog.closeAll();
				$state.go('arquivos');
			}, function() {
				ctrl.hasError = true;
				ctrl.error = "Email ou senha inválidos";
			});
		};
	}]);
})();

