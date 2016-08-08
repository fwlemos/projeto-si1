(function() {
	'use strict';

	app.controller("arquivosController", ['$state', 'ngDialog', 'userService', 'arquivos', function($state, ngDialog, userService, arquivos) {
		this.arquivos = arquivos.data;
	}]);
})();