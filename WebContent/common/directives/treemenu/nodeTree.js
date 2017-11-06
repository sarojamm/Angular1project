'use strict';

define(['directive','ngTable','underscore','jquery' ], function(directives ,ngTable,_,$) {
    directives.directive('nodeTree', function(  ngTableParams,genericServices ) {
        return { 
        	template: '<node ng-repeat="node in tree"></node>',
 	        replace: true,
 	        transclude: true,
 	        restrict: 'E',
 	        scope: {
 	          tree: '=ngModel'
 	        }  
        };
    });
});
