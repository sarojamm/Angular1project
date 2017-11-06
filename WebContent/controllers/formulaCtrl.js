'use strict';
define(['controller' ,'jquery', 'highstock','trendline', 'exporting','bootstrap', 'jqueryui' ], function(
		 controllers, $ , highstock, trendline,exporting,bootstrap,jqueryui ) {
  controllers.controller('formulaCtrl', function ($routeParams, $rootScope,$scope) { 	  
	  $scope.reportid = $routeParams.reportid;
	  if($scope.reportid == null ) $scope.reportid =36840361 ;	   
	$scope.servicename ="/lteservice/getFormulaByReportID/" +$scope.reportid ;
 	$scope.tableTitle="User Reports"; 	   
  
  });
});