(function() {
    app.directive('passwordMatch', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                password: '=passwordMatch'
            },
            link: function(scope, el, attrs, ctrl) {
                ctrl.$validators.match = function(modelValue) {
                    return modelValue == scope.password;
                };

                scope.$watch('password', function() {
                    ctrl.$validate();
                })
            }
        };
    });
})();