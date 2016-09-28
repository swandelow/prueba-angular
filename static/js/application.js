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

App.controller('ApplicationController', function($scope, $filter) {
    $scope.data = { 'foo': 'bar' };
    $scope.savedObjects = [];

    function formatDate(date) {
        return $filter('date')(date, 'dd/MM/yyyy');
    }

    $scope.save = function() {
        if ($scope.form.$valid) {
            var obj = {
                name: $scope.name,
                period: { from: formatDate($scope.period.from), to: formatDate($scope.period.to) }
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
