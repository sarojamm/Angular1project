'use strict';

define(['directive' ], function(directives ) {
    directives.directive('submenu', function( ) {
        return {
            restrict: 'A',
            replace: false,
            transclude: true,
            templateUrl: 'common/directives/submenu.html',
            controller: function($scope, $rootScope,$resource, $attrs) {
                $scope.paramData = [];
                $scope.selectedParamData = [];
                $scope.paramDataValues ='';
                $scope.paramDataValueDetail ='';
                $scope.selectedParam = 'Assets';
                $scope.paramValue= [];
                $scope.pageTitle = $attrs.pageTitle;
               
            }
        };
    });
});
