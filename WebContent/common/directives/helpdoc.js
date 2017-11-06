'use strict';

define(['directive', 'jquery' ], function(directives ,$) {
    directives.directive('helpDoc', function(  ) {
        return {
            restrict: 'A',
            replace: false,
            transclude: true,
            templateUrl: 'common/directives/help.html',
            controller: function($rootScope,$scope , $filter, $resource, $attrs,$location, $timeout,$window) { 
	            $scope.pagetitle = $attrs.pagetitle;
	            $scope.baseUrl = $location.protocol()+ "://"+ $location.host()+":"+$location.port()+"/tewebver2/uploads";			
	            console.log( " $scope.baseUrl: "  + $scope.baseUrl);
	            getFileList(); 
	            function getFileList(){ 
	             	$scope.fileList={};	
	             	$.ajax({
	             		  url: $scope.baseUrl,
	             		  success: function(data){
	             		     $(data).find("td > a").each(function(){
	             		        // will loop through 
	             		    	 var fname =  $(this).attr("href").replace("/ltedocs/","");
		         	            $scope.fileList[fname]= ( $(this).attr("href")); 
	             		    	console.log(fname + " Found a file: " );
	             		     });
	             		  }
	             		});	              
	         	}
            },
            link: function($scope, $resource, $attrs) { 
            	
            }
        };
    });
});