'use strict';
define(['controller' ,'jquery', 'highstock','trendline', 'exporting','bootstrap', 'jqueryui' ], function(
		 controllers, $ , highstock, trendline,exporting,bootstrap,jqueryui ) {
  controllers.controller('userReportsCtrl', function (globalUtil,$rootScope, $scope,genericServices,sessionService) { 
	  console.log(" $rootScope.loginuid  => " +  $rootScope.loginuid);
	  $scope.loginuid=  $rootScope.loginuid;
	  $scope.tabletitle="User Reports"; 
	  getstats("none"); 
 	  globalUtil.getGridHight("#mainrow2");
 	  $scope.isrefersh =true;
 	  $scope.run=false;
	  $scope.view=false;
	  $scope.del=false; 
 	  $scope.refreshStats = function (){	 
    	 genericServices.resetStats();
		 getstats(new Date().getTime());
 	  }	
	  function  getstats(time){
	     $scope.data= genericServices.getUserRptData(time); 
 	     $scope.reportstats = genericServices.getReportstats(time);  	  
 	     $scope.toprunningrepts =  genericServices.getToprunningrepts(time);  
 	     $scope.appid = sessionService.getAppid();
	     $scope.title= sessionService.getSiteTitle();	
 	}
  });
});
