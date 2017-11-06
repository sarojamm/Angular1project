'use strict';

define(['directive', 'jquery' ], function(directives ,$) {
    directives.directive('popupModel', function(  ) {
        return {
            restrict: 'A',
            replace: false,
            transclude: true,
            templateUrl: 'common/directives/popupmodel.html',
            controller: function($scope ,$rootScope,  $attrs ) { 
            	 $scope.tableTitle =  $scope.$eval($attrs.chTitle); 
                 $scope.mylist     =      $scope.$eval($attrs.servicename);          
	              
            },
            link: function($scope, $resource, $attrs) { 
            	
            }
        };
    });
});