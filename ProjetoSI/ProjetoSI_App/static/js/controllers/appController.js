(function() {
	'use strict';

	app.controller('appController', ['$rootScope', '$state', 'userService', 'AUTH_EVENT', function($rootScope, $state, userService, AUTH_EVENT) {
		var ctrl = this;

		this.isLoggedIn = function() {
			return userService.isLoggedIn();
		};
		
		this.logout = function() {
			userService.logout();
			$state.go('login');
		};

        $rootScope.$on(AUTH_EVENT.loginSuccess, function() {
		    userService.getUser().then(function (user) {
				ctrl.user = user;
			});
        });
	}]);
})();