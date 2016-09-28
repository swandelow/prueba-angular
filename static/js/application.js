window.App = angular.module('appPrueba', [
    'ui.bootstrap'
]);
// Configuration
App.config(['uibDatepickerConfig', 'uibDatepickerPopupConfig', function(uibDatepickerConfig, uibDatepickerPopupConfig) {
    uibDatepickerConfig.showWeeks = false;
    uibDatepickerConfig.formatMonth = 'MM';
    uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
    uibDatepickerPopupConfig.onOpenFocus = false;
}]);

App.controller('ApplicationController', function($scope) {
    $scope.data = { 'foo': 'bar' };
    $scope.savedObjects = [];

    $scope.save = function() {
        if ($scope.form.$valid) {
            var obj = {
                name: $scope.name,
                period: { from: $scope.period.from, to: $scope.period.to }
            };

            $scope.savedObjects.push(obj);
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
