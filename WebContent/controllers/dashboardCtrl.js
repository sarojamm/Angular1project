 
'use strict';

define(['controller','jquery' ], function(controllers ,$) {
    controllers.controller('dashboardCtrl', function ( $rootScope,$scope) { 
    	$scope.data ={}; 
    	$.getJSON("common/services/stub/assetdata.json", function(data){
			console.log("data is " + data.length); 
			$scope.data = data; 
			console.log("$scope data is " + $scope.data.length);
			$scope.$apply;
    	});
    });
});