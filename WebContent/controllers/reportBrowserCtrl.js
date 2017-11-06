'use strict';
define(['controller' ,'jquery', 'highstock','trendline', 'exporting','bootstrap', 'jqueryui' ], function(
		 controllers, $ , highstock, trendline,exporting,bootstrap,jqueryui ) {
    controllers.controller('reportBrowserCtrl', function (globalUtil,$routeParams,$rootScope,$location, $scope,genericServices,sessionService) { 
	$scope.loginuid=  $rootScope.loginuid;
//	$scope.servicename ="/lteservice/findReportInstanceByStatusAndUserName/Complete/" +$rootScope.loginuid;
	$scope.servicename ="/lteservice/getReportInstanceByUserName/" +$rootScope.loginuid;
  	$scope.tabletitle="Report Browser" ; 
  	getstats("none");
 	$scope.run=false;
	$scope.view=true;
	$scope.del=false;
	globalUtil.getGridHight("#mainrow2");
	function getstats(time){ 		
		$scope.rptInstancedata = genericServices.getRptInstancedata(time);
		$scope.data= $scope.rptInstancedata; 
	    $scope.reportstats = genericServices.getReportstats(time);  	  
	    $scope.toprunningrepts =  genericServices.getToprunningrepts(time);  
	  	$rootScope.view=true;		
	  	$scope.appid = sessionService.getAppid();
		$scope.title= sessionService.getSiteTitle();	
	}
	function DeleteData(){
 		//alert("DeleteData");
 	}
	function ViewData(){
 		//alert("ViewData");
 	} 
	function RunData(){
 		//alert("RunData");
 	}  
    $scope.refreshStats = function (){	 
	    genericServices.resetStats();
	    getstats(new Date().getTime());
	}	
	$(window).resize(function(){ 	    	  
     	resizeGrid( );  	 
 	}); 	   
  function resizeGrid( ){ 
	 var hight = ($(window).height() - ($( "#head" ).height()+40));
	 if($rootScope.isMenu){
		 hight -=($( "#rptstatswin" ).height());
	 } 
	  $("#tblparent").css( 'height' ,  hight +'px' );   
 } 	 
//	$scope.$watch('isMenu', function(newValue, oldValue ) {
//     	 if(newValue ==  oldValue  )return;   
//     	 $rootScope.isMenu = newValue;
//        localStorage.setItem("isMenu" , newValue); 
//        resizeGrid( );
//   });  	
  });
}); 