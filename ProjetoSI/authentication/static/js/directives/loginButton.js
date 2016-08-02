(function() {
	'use strict';

	app.directive('loginButton', function($state, ngDialog, userService) {
		return {
			restrict: 'A',
			template: '<button class="btn f-right" ng-if="show()" ng-click="showPopupLogin()">Entrar</button>',
			link: function(scope) {
				scope.showPopupLogin = function() {
					ngDialog.open({
						template: '/static/views/popup-login.html',
						controller: 'loginController',
						controllerAs: 'login',
						className: 'ngdialog-theme-default ngdialog-theme-custom2'
					});
				};

				scope.show = function() {
					return !userService.isLoggedIn() && $state.is('login');
				};
			}
		};
	});
})();