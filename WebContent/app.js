'use strict';

define([ 
        'controller',
        'service',
        'directive',             
              
        'lib/slick/lib/firebugx',
        'lib/slick/lib/jquery-ui-1.8.16.custom.min',
        'lib/slick/lib/jquery.event.drag-2.2',
        'lib/slick/lib/jquery.event.drop-2.2',
        'lib/slick/lib/jquery.mousewheel',
        'lib/slick/slick.core',
        'lib/slick/slick.grid',
        'lib/slick/plugins/slick.cellrangeselector',
        'lib/slick/plugins/slick.cellselectionmodel',
        'lib/slick/plugins/slick.rowselectionmodel',
        'lib/slick/plugins/slick.rowmovemanager',
        'lib/slick/slick.formatters',
        'lib/slick/slick.editors', 
        'lib/slick/slick.dataview',
        'lib/slick/plugins/slick.autotooltips',        
        'lib/slick/controls/slick.pager',
        'lib/slick/controls/slick.columnpicker'  ,
        'common/directives/myHeader', 
       'common/directives/popupModel', 
   //    'common/directives/helpdoc',  
     
       'common/services/commonUtil', 
        'common/services/FileUtil', 
        'common/services/chartDefUtil', 
        'common/services/chartDataUtil',  
        'common/services/tooltipUtil',
        'common/services/globalUtil',
        'common/services/timeUtil',
        'common/services/exportService',   
        'common/services/loginService', 
        'common/services/sessionService', 
        
        'controllers/sahCtrl' ,
        'controllers/homeCtrl' ,
        'controllers/dashboardCtrl',
        'controllers/custReportCtrl',
        'controllers/preferencesCtrl',
        'controllers/elptTableCtrl', 
        'controllers/reportBrowserCtrl',
        'controllers/userReportsCtrl',
        'controllers/reportInfoCtrl',
        'controllers/formulaCtrl',
        'controllers/errorCtrl',
        'common/directives/charts/stockChart', 
        'common/directives/basetable/baseTable', 
        'controllers/schedulingCtrl'
], function() {
	 return angular.module('app', [ 'ngResource','app.services',  'app.controllers' ,'app.directives'])
    .config(['$httpProvider','$compileProvider',function ($httpProvider,$compileProvider) {
	    $httpProvider.defaults.useXDomain = true; 
	     
	 }]) 	 
	.config(function ($provide){
		$provide.decorator("$exceptionHandler",
				 ["$delegate", 
				    function ($delegate) {
				    		return function(exception, cause){
				    			exception.message =" the message comming from "+ exception.message;
				    			$delegate(exception, cause);
				    			//alert("this is  test for update file.from app.js" + exception.message);				    	
				    };
	   }]);
	
	})
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when( '/',            { templateUrl : './info/about.html', controller: 'homeCtrl'})
	        .when( '/home',        { templateUrl : './info/about.html', controller: 'homeCtrl'}) 
	        .when( '/sah',         { templateUrl : 'view/sah.html', controller: 'homeCtrl'})
	        // table views used base table directive
	        .when('/reportbrowser/', {templateUrl : 'view/reportbrowser.html', controller: 'reportBrowserCtrl'})
	        .when('/userReports/',   {templateUrl : 'view/reportbrowser.html', controller: 'userReportsCtrl'}) 	        
	        .when('/reportInfo/:reportId/:eleType/:loginuid/:appid',     {templateUrl: 'view/reportinfo.html', controller: 'reportInfoCtrl'})     
	        .when('/reportInfo/:reportId',     {templateUrl: 'view/reportinfo.html', controller: 'reportInfoCtrl'})      	      
	        .when('/reportInfo/:reportId/:isrefresh',     {templateUrl: 'view/reportinfo.html', controller: 'reportInfoCtrl'})      	      
	        .when('/formulasByReportId/:loginuid',  {templateUrl: 'view/formulas.html', controller: 'formulaCtrl'}) 
            .when('/reports/:isdd/:appid/:reportuid/:rfn/:rid/:loginuid',   {templateUrl: 'view/charttemplate.html', controller: 'elptTableCtrl'}) // This is  used by customreporting view.
            .when('/reports/:isdd/:appid/:reportuid/:rfn/:rid/:rl/:isar/:rt/:lrl/:loginuid',   {templateUrl: 'view/charttemplate.html', controller: 'elptTableCtrl'}) 
              // end  table views used base table directive	    
	        .when( '/baseTable',      { templateUrl : 'common/directives/basetable/editablegrid.html'})
	        
	        .when( '/histscantrend',      { templateUrl : 'view/histscantrend.html', controller: 'sahCtrl'})
	        .when( '/about',         { templateUrl : './info/about.html', controller: 'sahCtrl'}) 
            .when( '/contact',       { templateUrl : './info/contact.html', controller: 'homeCtrl'})              
             .when('/custReport',     {templateUrl: 'view/custreport.html', controller: 'custReportCtrl'}) 
            .when('/myprefs',        {templateUrl: 'view/preferences.html', controller: 'preferencesCtrl'}) 
            .when('/dashboard',      {templateUrl: 'view/tabheader.html', controller: 'dashboardCtrl'}) 
            .when('/scheduling',     {templateUrl : 'view/scheduling.html', controller: 'schedulingCtrl'})  
            .when('/404/:msg',     {templateUrl : 'view/error.html', controller: 'errorCtrl'}) 
	        .otherwise(             {redirectTo: 'info/about.html', controller: 'homeCtrl'}); 
         });

});

function useStub() {
    return (window.location.protocol == 'http:');
}
