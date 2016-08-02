(function() {
	'use strict';

	app.service('userService', ['$http', '$cookies', '$rootScope', '$q', 'SESSION_COOKIE_NAME', 'AUTH_EVENT', function($http, $cookies, $rootScope, $q, SESSION_COOKIE_NAME, AUTH_EVENT) {
		var self = this;

		self.userId = -1;
		self.userLogado = null;
		self.token = '';

		this.loginById = function(id, keepLogin, token) {
			return $http.get('rest-auth/user/').success(function(user) {
				self.userId = id;
				self.userLogado = user;

				self.setToken(token, keepLogin);
				$rootScope.$broadcast(AUTH_EVENT.loginSuccess);
			});
		};

		this.logout = function() {
			self.userId = -1;
			self.userLogado = null;

			$cookies.remove(SESSION_COOKIE_NAME);

			$http.post('rest-auth/logout/', {
				key: self.getToken()
			}).success(function() {
				self.token = '';
			});
		};

		this.isLoggedIn = function() {
			return self.userId !== -1;
		};

		this.getUserId = function() {
			return self.userId;
		};

		this.setToken = function(token, keep) {
			var config = {};

			if (keep) {
				var date = new Date();
				date.setDate(date.getDate() + 15);
				config.expires = date;
			}

			$cookies.put(SESSION_COOKIE_NAME, token, config);
			self.token = token;
		};

		this.getToken = function() {
			return self.token;
		};

		this.getUser = function() {
			return self.userLogado;
		};

		this.login = function(usuario) {
			var deferred = $q.defer();

			$http.post('rest-auth/login/', usuario).success(function(data) {
				if (data.non_field_errors === undefined) {
					self.loginById(data.user, usuario.keepLogin, data.key);
					deferred.resolve(self.userId);
				} else {
					$rootScope.$broadcast(AUTH_EVENT.loginFailed);
					deferred.reject();
				}
			})
			.error(function(data) {
				$rootScope.$broadcast(AUTH_EVENT.loginFailed);
				deferred.reject(data);
			});

			return deferred.promise;
		};

		this.reset = function() {
			self.userId = -1;
			self.userLogado = null;
		};
	}]);
})();