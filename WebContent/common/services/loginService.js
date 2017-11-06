'use strict'; 
define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("loginService",  ['$scope','$route','Auth','$modal','$timeout',function (   $rootScope ) { 
	//services.service("loginService",  ['$scope','$route','Auth','$modal','$timeout',function ( genericServices, $rootScope,$scope,$route,Auth,$modal,$timeout ) { 
	
		 
		this.checkLogin = function(){
			var isLoggedIn =""+ sessionStorage.getItem("loggedIn");
			 if(isLoggedIn === "valid"){
	        	 $rootScope.loginuid =  sessionStorage.getItem("loginuid" );
	        	 $rootScope.loggedIn =  sessionStorage.getItem("loggedIn" );	        	  
	         }
			 else{ 
				 genericServices.redirectSIte(genericServices.getLoginUrl());		
			 }
		} 
		this.login =  function(loginid,isloggedin){ 
 	        sessionStorage.userid = loginid;  
 	        sessionStorage.setItem("loggedIn" , isloggedin);
 	        sessionStorage.setItem("loginuid" , loginid);
 	        
//    	    Auth.save({
//      	      'username': $scope.username,
//      	      'password': $scope.password
//      	    },function(data) {
//      	      $scope.loggedIn = true;
//      	      $scope.user = data.user; 
//      	      sessionStorage.loggedIn = $scope.loggedIn;
//      	      sessionStorage.user = data.user;  
//      	      $route.reload();
//      	    },function(response){
//      	      $scope.flash = response.data.flash;   
//      	      $scope.pop = true;    
//      	      $timeout(function(){$scope.pop = false;}, 3000);
//      	    })
        };
		this.logout = function (){
			delete sessionStorage.loginuid; 
         	delete sessionStorage.loggedIn;
//        	Auth.get({},function(){  
//          	  delete sessionStorage.user; 
//          	  delete sessionStorage.loggedIn;
//          	  $scope.loggedIn = false;
//          	  $timeout(function(){$route.reload();}, 1000);
//             })            	
         };
	}]);
});