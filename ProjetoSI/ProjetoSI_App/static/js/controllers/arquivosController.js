(function() {
	'use strict';

	app.controller("arquivosController", ['$state', 'ngDialog', 'userService', 'arquivos', function($state, ngDialog, userService, arquivos) {
		var ctrl = this;
		ctrl.arquivos = arquivos.data;
	}]);
})();