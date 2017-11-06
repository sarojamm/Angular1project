'use strict';
 
define(['angular'], function(angular){
    return angular.module('app.controllers', []).controller('ListCtrl', ['$scope', '$http', 'APP_NAME', 'FIRST_URL', function($scope, $http, APP_NAME, FIRST_URL) {
    	  $http.get('resources/Test.properties').then(function (response) {
				$scope.TestStringValue = response.data.TestString;
				$scope.BooleanValue = response.data.BooleanValue;
			    console.log('TestString is ', response.data.TestString);
			    console.log('BooleanValue is ', response.data.BooleanValue);            
			  });
}]);
});

