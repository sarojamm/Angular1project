 'use strict';

define(['controller' ,'jquery' ], function(controllers, $) {
    controllers.controller('homeCtrl', function (  $rootScope,$scope ) { 
    	$scope.pagetitle=' Home ';
         $scope.displayTree = [ ];
        
    });
});