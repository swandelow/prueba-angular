window.App = angular.module('appPrueba', [
    'ui.bootstrap',
    'ngResource',
]);
// Configuration
App.config(['uibDatepickerConfig', 'uibDatepickerPopupConfig', function(uibDatepickerConfig, uibDatepickerPopupConfig) {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerConfig.formatMonth = 'MM';
    uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
    uibDatepickerPopupConfig.onOpenFocus = false;
}]);

App.controller('ApplicationController', function($scope, $filter, $resource) {
    $scope.data = { 'foo': 'bar' };
    $scope.savedObjects = [];
    $scope.todo = {};

    function formatDate(date) {
        return $filter('date')(date, 'dd/MM/yyyy');
    }

    var Todos = $resource('/api/todos/:todoId', 
                            {todoId:'@id'},
                            {
                                post: {method: 'POST'},
                                get: {method: 'GET'},
                                getAll: {method: 'GET', isArray: true}
                            });

    $scope.save = function() {
        if ($scope.form.$valid) {
            var obj = {
                name: $scope.todo.name,
                period: { from: formatDate($scope.todo.period.from), to: formatDate($scope.todo.period.to) }
            };

            $scope.savedObjects.push(obj);
            Todos.post($scope.todo).$promise
                            .then(function(response){
                                console.log('saved:' + response.data);
                            }, function(error){
                                console.log('error: ' + error.data.code + ' - '+ error.data.message);
                            });
        } else {
            for (i in $scope.form.$error.required) {
                console.log($scope.form.$error.required[i].$name);
            }
        }

    };
});

App.directive('doubleDate', function() {
    return {
        scope: {
            ngModel: '=',
            name: '@'
        },

        templateUrl: 'static/partial/doubledate.html'
    }
});
