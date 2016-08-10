(function() {
	'use strict';

	app.service('userService', ['$http', '$cookies', '$rootScope', '$q', '$state', 'SESSION_COOKIE_NAME', 'AUTH_EVENT', function($http, $cookies, $rootScope, $q, $state, SESSION_COOKIE_NAME, AUTH_EVENT) {
		var self = this;

		self.userId = -1;
		self.loggedUser = undefined;
		self.token = '';

		this.loginById = function(id, keepLogin, token) {
			return $http.get('rest-auth/user/').then(function(user) {
				self.userId = id;
				self.loggedUser = user.data;
				self.setToken(token, keepLogin);

				$rootScope.$broadcast(AUTH_EVENT.loginSuccess);

				return self.loggedUser;

			});
		};

		this.logout = function() {
			self.userId = -1;
			self.loggedUser = undefined;

			$cookies.remove(SESSION_COOKIE_NAME);

			$http.post('rest-auth/logout/', {
				key: self.getToken()
			}).success(function() {
				self.token = '';
			});
		};

		this.isLoggedIn = function() {
			return angular.isDefined(self.loggedUser);
		};

		this.getUserId = function() {
			return self.getUser().then(function () {
				return self.userId;
			});
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
            var deferred = $q.defer();

            if (self.isLoggedIn()) {
                deferred.resolve(self.loggedUser);
                return deferred.promise;
            }

            var token = $cookies.get(SESSION_COOKIE_NAME);

            if (token) {
                $http.get('user-id/' + token).then(function(res) {
                    self.loginById(res.data.user_id, true, token).then(function() {
                        deferred.resolve(self.loggedUser);
                    }, function() {
                        $cookies.remove(SESSION_COOKIE_NAME);
                        deferred.reject();
                    });
                });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };

        this.login = function(usuario) {
            var deferred = $q.defer();
            $http.post('login/', usuario).success(function(data) {
                if (data.non_field_errors === undefined) {
                    self.loginById(data.user, usuario.keepLogin, data.key).then(function() {
                    	$state.go('arquivos');
                        deferred.resolve(self.userId);
                    });
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
			self.loggedUser = undefined;
		};

		this.isAuthorized = function(toState, safeStates) {
            return (!self.isLoggedIn() && safeStates.indexOf(toState) !== -1) || (self.isLoggedIn() && safeStates.indexOf(toState) === -1);
        };
	}]);
})();