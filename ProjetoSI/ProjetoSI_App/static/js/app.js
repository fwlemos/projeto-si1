var app = angular.module('projetoSI1', ['ui.router', 'ngDialog', 'ngCookies', 'ngAnimate','ngFileUpload', 'ngMessages'])

	.constant('AUTH_EVENT', {
		loginSuccess: 'login-success',
		loginFailed: 'login-failed',
		notAuthenticated: 'not-authenticated',
		notAuthorized: 'not-authorized'
	})

    .constant('SESSION_COOKIE_NAME', '_uidtkn')

	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
		$httpProvider.interceptors.push(function($q) {
			return {
				request: function(config) {

					return config;
				}
			};
		});

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: '/static/views/login.html',
				controller: 'loginController',
				controllerAs: 'login',
				resolve: {
					user: function($http, $state, $cookies, $rootScope, userService, SESSION_COOKIE_NAME, AUTH_EVENT) {
						if (!userService.isLoggedIn()) {
							var token = $cookies.get(SESSION_COOKIE_NAME);

							if (token) {
								return $http.get('rest-auth/user-id/' + token).then(function(res) {
									console.log(res.data.user_id);
									return userService.loginById(res.data.user_id, true, token).then(function() {
										$rootScope.$broadcast(AUTH_EVENT.loginSuccess);
										return userService.getUser();
									}, function() {
										$cookies.remove(SESSION_COOKIE_NAME);
									});
								});
							}
						}
					}
				}
			})
			.state('indexador', {
				url: '/indexador',
				templateUrl: '/static/views/indexador.html'
			})
	}])

	.run(['$state', '$rootScope', 'userService', 'AUTH_EVENT', function($state, $rootScope, userService, AUTH_EVENT) {
		var safeStates = ['login', 'senha-reset', 'senha-reset.confirm'];

		$rootScope.$on('$stateChangeStart', function(event, toState) {
			if (!userService.isLoggedIn() && safeStates.indexOf(toState.name) === -1) {
				event.preventDefault();
				$rootScope.$emit(AUTH_EVENT.notAuthorized);
				$state.go('login');
			} else if (userService.isLoggedIn() && safeStates.indexOf(toState.name) !== -1) {
				event.preventDefault();
				$state.go('indexador');
			}
		});

		$rootScope.$on(AUTH_EVENT.loginSuccess, function() {
			$state.go('indexador');
		});
	}]);