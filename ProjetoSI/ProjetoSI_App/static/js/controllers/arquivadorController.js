(function() {
	'use strict';

	app.controller('arquivadorController', ['$rootScope', '$scope', '$http', '$state', 'ngDialog', 'userService', 'arquivoInfo'
		function($rootScope, $scope, $http, $state, ngDialog, userService, arquivoInfo) {

			var ctrl = this;

			userService.getUserId().then(function (id) {
				ctrl.arquivo_create = "file-create/" + id + "/";
			});

			if (arquivoInfo.arquivo === undefined) {
				this.arquivo = {};
			}

			this.criaArquivo = function(arquivo, name, content) {
				userService.getUserId().then(function(id) {
					var data = {
						name: arquivo.name,
						content: arquivo.content,
						user: id
					};

					angular.extend(data, arquivo);

				});
			 };
	}]);
})();
