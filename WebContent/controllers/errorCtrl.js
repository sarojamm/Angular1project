'use strict';
define(['controller' ,'jquery', 'highstock','trendline', 'exporting','bootstrap', 'jqueryui' ], function(
		 controllers, $ , highstock, trendline,exporting,bootstrap,jqueryui ) {
  controllers.controller('errorCtrl', function ($routeParams,$rootScope, $scope) { 
	  console.log(" $rootScope.loginuid  => " +  $rootScope.loginuid);
	  $scope.loginuid=  $rootScope.loginuid;	
 	  $scope.message= $rootScope.errormsgs[$routeParams.msg];    
   
  });
});
