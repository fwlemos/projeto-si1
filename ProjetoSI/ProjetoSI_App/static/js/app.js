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
                    config.url = config.url + '?t=' + Date.now();
                    return config;
                }
            };
        });

        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

		$urlRouterProvider.otherwise('/login');


        $stateProvider
            .state('app', {
                abstract: true,
                resolve: {
                    user: ['$state', 'userService', function($state, userService) {
                        return userService.getUser().then(function(user) {
                            return user;
                        }, function() {
                            return {};
                        });
                    }]
                },
                template: '<div ui-view></div>'
            })
            .state('login', {
                parent: 'app',
                url: '/login',
                templateUrl: '/static/views/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            .state('arquivos', {
                parent: 'app',
				url: '/arquivos',
				templateUrl: '/static/views/arquivos.html',
				controller: 'arquivosController',
				controllerAs: 'arquivos',
				resolve: {
                    arquivos: function($http, userService) {
						return userService.getUserId().then(function(id) {
							return $http.get("file-create/" + id + "/").then(function(data) {
								return data;
							});
						});
					}
				}
			})
            .state('arquivo-create', {
                parent: 'app',
				url: '/arquivo-create',
				templateUrl: '/static/views/arquivos.html',
				controller: 'arquivadorController',
				controllerAs: 'arquivador',
				resolve: {
                    arquivoInfo: function() {
						return {};
					}
				}
			});
	}])

    .run(['$state', '$rootScope', '$q', 'userService', 'AUTH_EVENT', function($state, $rootScope, $q, userService, AUTH_EVENT) {
        var safeStates = ['login', 'senha-reset', 'senha-reset.confirm'];

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (!userService.isLoggedIn()) {
                userService.getUser().then(function(user) {
                    if (!userService.isAuthorized(toState.name, safeStates)) {
                        event.preventDefault();
                        $rootScope.$broadcast(AUTH_EVENT.notAuthorized);
                    }
                }, function() {
                    if (!userService.isAuthorized(toState.name, safeStates)) {
                        event.preventDefault();
                        $rootScope.$broadcast(AUTH_EVENT.notAuthenticated);
                    }
                });
            } else {
                if (!userService.isAuthorized(toState.name, safeStates)) {
                    event.preventDefault();
                    $rootScope.$broadcast(AUTH_EVENT.notAuthorized);
                }
            }
        });

        $rootScope.$on(AUTH_EVENT.notAuthorized, function(event) {
            $state.go('arquivos');
        });

        $rootScope.$on(AUTH_EVENT.notAuthenticated, function(event) {
            $state.go('login');
        });
    }]);