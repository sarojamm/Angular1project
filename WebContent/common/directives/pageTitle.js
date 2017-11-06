'use strict';

define(['directive' ], function(directives ) {
    directives.directive('pageTitle', function( ) {
        return {
            restrict: 'A',
            replace: false,
            transclude: true,
           // templateUrl: 'common/directives/header.html',
            template: '<div id="pagetitle"> {{pageTitle}} </div>',
            controller: function($rootScope,$scope, $resource, $attrs) { 
                $scope.pageTitle = $attrs.pageTitle;
				 
            }
        };
    });
});
