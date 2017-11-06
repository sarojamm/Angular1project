'use strict';

define(['directive' ], function(directives ) {
    directives.directive('myHeader', function( ) {
        return {
            restrict: 'A',
            replace: false,
            transclude: true,
            templateUrl: 'common/directives/header.html',
            scope: {
            	loginuid: '@' ,
            	appid: '@' ,
                seconds: '@' ,
                siteTitle: '@' ,
                isMenu:'='
            },            
            controller: function(genericServices,globalUtil, $routeParams,$rootScope, $scope, $resource, $attrs) { 
                $scope.siteTitle = $attrs.siteTitle; 
                $scope.seconds = $attrs.seconds;
                $scope.appid = $attrs.appid; 
                $scope.loginuid = $attrs.loginuid;
                $scope.tips=$rootScope.tooltipmsgs.home;
               
             	$scope.displayTree = [ 
				{
					text : 'Home',
					url : '#/home',
				}, 
				{
					text : 'Ext Links',
					url : '#',
					classid : 'dropdown-menu',
					submenu : [ {
						text : 'Notification Tool',
						url : 'http://mydummysite.com:8080/login',
						target:'target-blank',
					}, {
						text : 'NPT',
						url : 'http://mydummysite.com:8080/NPT/login.htm',
						target:'target-blank',
					}, {
						text : 'New Chicago Web Site',
						url : 'https://mydummysite.com:8080:8080/cgi-bin/login.cgi',
						target:'target-blank',
					} ]
				},  {
					text : 'Feedback',
					url : '/#/feedback',
					target:'target-blank',
				}  ];
				 
//				$scope.retriveStats = function (option){		
//					 console.log("myheader retriveStats => " ); 
//					 $scope.time = new Date();
//					 $scope.view=true;
//					 genericServices.resetStats();
//					 $scope.rptInstancedata= genericServices.getRptInstancedata(); 							
//					 $scope.reportstats = genericServices.getReportstats();  	  
//					 $scope.toprunningrepts =  genericServices.getToprunningrepts(); 
//					 
//					 $rootScope.rptInstancedata= $scope.rptInstancedata;
//					 $rootScope.reportstats= $scope.reportstats;							
//				     $rootScope.toprunningrepts= $scope.toprunningrepts;
//					 $scope.$apply();
//			 	  }
				
            }
        };
    });
});
