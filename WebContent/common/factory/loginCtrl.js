 'use strict';

define(['controller' ,'jquery' ], function(controllers, $) {
    controllers.controller('loginCtrl',  ['$scope','$route','Auth','$modal','$timeout',function (  $rootScope,$scope,$route,Auth,$modal,$timeout ) { 
    	      //controller('loginCtrl', ['$scope','$route','Auth','$modal','$timeout', function($scope,$route,Auth,$modal,$timeout){
         
         if(sessionStorage.loggedIn){
        	    $scope.user = sessionStorage.user; 
        	    console.log('Session variable is active');
        	    $scope.loggedIn = sessionStorage.loggedIn;
         }
    	 $scope.login = function(){
        	    Auth.save({
        	      'username': $scope.username,
        	      'password': $scope.password
        	    },function(data) {
        	      $scope.loggedIn = true;
        	      $scope.user = data.user; 
        	      sessionStorage.loggedIn = $scope.loggedIn;
        	      sessionStorage.user = data.user;  
        	      $route.reload();
        	    },function(response){
        	      $scope.flash = response.data.flash;   
        	      $scope.pop = true;    
        	      $timeout(function(){$scope.pop = false;}, 3000);
        	    })
         };
         $scope.logout = function (){
        	Auth.get({},function(){  
        	  delete sessionStorage.user; 
        	  delete sessionStorage.loggedIn;
        	  $scope.loggedIn = false;
        	  $timeout(function(){$route.reload();}, 1000);
           })            	
         };
         
         
         
         
         
         
         
         
         
         
         
         
    }]);
});