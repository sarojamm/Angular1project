'use strict'; 
define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("sessionService",  ['$rootScope',function (  $rootScope ) { 
		//services.service("sessionService",  ['$scope','$route','Auth','$modal','$timeout',function ( genericServices, $rootScope,$scope,$route,Auth,$modal,$timeout ) { 		 
			
		//we can do one function with key and values as parameters but choose this approach  to identify all session variables maintained by the application.   
		this.checkBrowser=  function(){
			if (typeof(Storage) === "undefined") {   
				alert("Sorry, your browser does not support Web Storage...");
			} 
		}		
	    this.getAppid = function(){
	    	return sessionStorage.getItem("appid" );
		} 		
	    this.setAppid = function(appid){
	    	 sessionStorage.setItem("appid", appid);
		} 
	    this.getRefresh = function(){
	    	return sessionStorage.getItem("isrefresh");
		} 		
	    this.setRefresh = function(isrefresh){
	    	  sessionStorage.setItem("isrefresh" ,isrefresh); 
		} 
	    
	    
	    
	    this.getAppName = function(){
	    	return sessionStorage.getItem("appname");
		} 		
	    this.setAppName = function(appname){
	    	 sessionStorage.setItem("appname" , appname  + " LTE Performance Tool");
	    	 sessionStorage.setItem("siteTitle" , appname  + " LTE Performance Tool");
		} 
	    this.getSiteTitle = function( ){
	    	return sessionStorage.getItem("siteTitle" );
		} 			
	    this.setSiteTitle = function(siteTitle){
	    	sessionStorage.setItem("siteTitle" , siteTitle);
		}
	    this.getLoginUid = function( ){
	    	return sessionStorage.getItem("loginuid" );
		} 	
	    this.setLoginUid = function(loginuid ){
	    	return sessionStorage.setItem("loginuid", loginuid );
		} 
	    this.getReportId = function( ){
	    	return sessionStorage.getItem("reportid" );
		} 	
	    this.setReportId = function(reportid ){
	    	return sessionStorage.setItem("reportid", reportid );
		} 
	    
	    
	}]);
});