(function() {
	'use strict';

	app.controller('arquivadorController', ['$rootScope', '$scope', '$http', '$state', 'ngDialog', 'userService', 'arquivoInfo',
		function($rootScope, $scope, $http, $state, ngDialog, userService, arquivoInfo) {

			if (arquivoInfo.arquivo !== undefined) {
				this.arquivo = arquivoInfo.arquivo;
			} else {
				this.arquivo = {};
			}

			this.criaArquivo = function (arquivo, name, content) {

				userService.getUserId().then(function (id) {
					var data = {
						name: arquivo.name,
						content: arquivo.content,
						user: id
					};

					angular.extend(data, arquivo);

					console.log(JSON.stringify(arquivo));
					console.log(arquivo);
					$http.post('file-create/' + id + '/', arquivo).success(function () {
						$state.go('arquivos');
					});
				});
			};
	}]);
})();
