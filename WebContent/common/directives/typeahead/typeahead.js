'use strict';

define(['directive' ], function(directives) {
    directives.directive('typeahead', function($timeout ) {
        return {
            

        	
        	restrict: 'AEC',
            $scope: {
              items: '=',
              prompt: '@',
              title: '@',
              subtitle: '@',
              model: '=',
              onSelect: '&'
            },
            link: function($scope, $resource, $attrs) { 
            	 
              $scope.handleSelection = function(selectedItem) {
    		  $scope.model = selectedItem;
    		  $scope.current = 0;
    		  $scope.selected = true;
    	    $timeout(function() {
    	    	$scope.onSelect();
    	    }, 200);
    	  };
    	  $scope.current = 0;
    	  $scope.selected = true; // hides the list initially
    	  $scope.isCurrent = function(index) {
    	    return $scope.current == index;
    	  };
    	  $scope.setCurrent = function(index) {
    	    $scope.current = index;
    	  };
            	
            },
            templateUrl: 'common/directives/common/directives/typeahead/typeahead.html'
        	
        	
        	
        	
        	
        	
        	
        };
    });
});
