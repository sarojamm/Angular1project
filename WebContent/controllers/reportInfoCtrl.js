 'use strict';
define(['controller' ,'jquery', 'highstock','trendline', 'exporting','bootstrap', 'jqueryui' ], function(
		 controllers, $ , highstock, trendline,exporting,bootstrap,jqueryui ) {
  controllers.controller('reportInfoCtrl', function ($route,$window,$location,$routeParams,$rootScope,$scope,sessionService,genericServices,globalUtil) { 
 	  setValues();
	  setRootParams();
	 // var timestr = ( sessionService.getRefresh() === "true"  ) ? new Date().getTime() : "none"
	  getstats(new Date().getTime() ); 
 	  getdata();  	 
 	  resizeGrid();
 	 	
//***********************************************************************************************//
//***  Local Functions ***// 
//***********************************************************************************************//
  function setValues(){
	    $scope.randtime=new Date().getTime();
 		$scope.isrefersh =false;
 		$scope.run=false;
 		$scope.del=false;
 		$scope.tableTitle=" Report Browser"; 	
 		$rootScope.isMenu=true;
 		$scope.isMenu=true;
 		$scope.time = new Date(); 
  }  
  function setRootParams(){ 
	  if($routeParams.isrefresh !==    'null' &&  $routeParams.isrefresh ===  'true'  ){    
		  $scope.isrefersh =true;	 
      }
	  else $scope.isrefersh =false;
    
    if($routeParams.reportId ==    'null'|| $routeParams.reportId ==  'undefined' 
		  || (typeof $routeParams.reportId === "undefined") || $routeParams.reportId ==  '' ){    
	    $scope.reportId =  sessionService.getReportId();
        $rootScope.reportId = sessionService.getReportId();	 
    }
    else{
    	$scope.reportId = $routeParams.reportId;
        $rootScope.reportId = $routeParams.reportId;
        sessionService.setReportId($scope.reportId );
    }
    $scope.tabletitle=" Report Information - " + $scope.reportId; 
    if ($routeParams.loginuid != null ){
       sessionService.setLoginUid  ($routeParams.loginuid );
       sessionService.setRefresh("true");
       $rootScope.loginuid = sessionService.getLoginUid(); 
       $scope.loginuid = sessionService.getLoginUid();		
    } 
    else{
    	$scope.loginuid = sessionService.getLoginUid();
    }
    if ($routeParams.appid != null) {
       $rootScope.appid = (($routeParams.appid in $rootScope.normalize)  ?  $rootScope.normalize[$routeParams.appid] : $routeParams.appid) ;
       $scope.appid=$rootScope.appid; 
       sessionService.setAppid( $rootScope.appid); 
       sessionService.setAppName( $rootScope.titles[$rootScope.appid]);  
       $scope.title= sessionService.getSiteTitle();			
    }else{
    	 $scope.title= sessionService.getSiteTitle();
    	 $scope.appid= sessionService.getAppid(); 
    	 $rootScope.appid= $scope.appid; 
    }
    if($routeParams.eleType ==    'null'|| $routeParams.eleType ==  'undefined' 
   		  || (typeof $routeParams.eleType === "undefined") || $routeParams.eleType ==  '' ){	
   			 $scope.servicename ="/lteservice/getReportInfoByReportId/" +$scope.reportId+"/none";
    }
    else $scope.servicename ="/lteservice/getReportInfoByReportId/" +$scope.reportId+"/"+$routeParams.eleType;
  }
  function getstats(time){	
	     if( $scope.isrefersh === true ){
	    	 genericServices.resetStats();
	    	 time = new Date().getTime();
	     }
	     else time='none';
	     $scope.rptInstancedata = genericServices.getRptInstancedata(time);;
	     $scope.reportstats = genericServices.getReportstats(time);   
	     $scope.toprunningrepts =  genericServices.getToprunningrepts(time);   
	     //sessionService.setRefresh("false");
//	 need to debug not working
	     //if(!checkReportIdExists($rootScope.reportId,  $scope.rptInstancedata)){
//	    	 $scope.reportId =  $scope.rptInstancedata[0].reportId;
//	    	 sessionService.setReportId($scope.reportId );
//	    	 $rootScope.reportId = sessionService.getReportId();	 
//	     }
//	     else{
//	    	 sessionService.setReportId($rootScope.reportId );
//	     }
	 	 $scope.view=true;
		 $rootScope.view=true;  
	     
	  }
	  function checkReportIdExists(rptId, arr) { 
		  return arr.some(function(el) {
		       return el.reportId === rptId;
		  }); 
	  }
  function getdata(){
  	  genericServices.retrieveElptData($scope.servicename );
      $scope.data =  genericServices.getElptData();  
      if($scope.data ==    'null'|| $scope.data ==  'undefined' || (typeof $scope.data === "undefined")){	
   		 // $location.url('/404'); 
   	    return "nodata";
      }
      $scope.reportInfo=($scope.data.rpt == null ) ? "nodata" :$scope.data.rpt;	 
      $scope.eleTypes=($scope.data.elemTypes == null ) ? "nodata" :$scope.data.elemTypes;	 ;
      $scope.elemDetails=($scope.data.elemDetails == null ) ? "nodata" :$scope.data.elemDetails;	 
      $scope.selection=($scope.data.eleTypes == null ) ? "nodata" :$scope.data.eleTypes[0];
	  if( $scope.reportInfo != "nodata"){	 
		  //resizeGrid("#eleDetails",120); 
    	  globalUtil.getGridHight("#mainrow");
		  $scope.tableTitle=" Report Info after data retrive"; 	  
	  }
	  else{
		  $location.url('/404/'+1 ); 
	  }		  
	  $scope.$apply;
  }
  function resizeGrid( ){ 
	var hight = ($(window).height() - ($( "#head" ).height()+40));
	if($rootScope.isMenu){
			 hight -=(170);
	} 
	$("#mainrow").css( 'height' ,  hight +'px' );
  } 	 
//***********************************************************************************************//
//***  onClick Functions ***// 
//***********************************************************************************************//
 var openDialog = function(msg){ 	 
	  if(msg != ""){
	     var dom = "<div>" +msg + "</div>"; 		
	 	 $(dom).dialog();
	  } 	          
 }; 
 $scope.setUserFormulas = function (){		
	 console.log("setUserFormulass");
	 $scope.servicename ="/lteservice/getFormulaByReportID/" + $rootScope.reportId;
	 $scope.tableTitle=" Report Info";
	 genericServices.retrieveElptData($scope.servicename );
	 $scope.formulasdata =  genericServices.getElptData();  
	 console.log("setUserFormulas  => " +$scope.servicename);
 }	
 $scope.retriveStats = function (){
//	 genericServices.resetStats();
//	 getstats(new Date().getTime());
	 var reportInfoUrl="/ltewebver2/#/reportInfo/"+$rootScope.reportId+"/" ;
	 sessionService.setRefresh("true");  
     genericServices.redirectSIte(reportInfoUrl);
 } 
 $scope.mydateFilter = function( ){
     console.log("  mydateFilter " );		 
 }
		 
//***********************************************************************************************//
  $(window).resize(function(){ 	    	  
	  resizeGrid( );  	 
  }); 	   
//***********************************************************************************************//
//***          Watch functions       ***//
//***********************************************************************************************//
//  $scope.$watch('isMenu', function(newValue, oldValue ) {
//	  if(newValue ==  oldValue  )return;   
//	  $rootScope.isMenu = newValue;
//	  localStorage.setItem("isMenu" , newValue); 
//	  resizeGrid( );
//  });  
		
		
  });
}); 