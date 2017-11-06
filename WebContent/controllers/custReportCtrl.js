'use strict';

define(['controller','jquery' ], function(controllers ,$) {
    controllers.controller('custReportCtrl', function ($routeParams,$rootScope, $scope,toolTipServices,genericServices) { 
       var grid, dataView, columns,  searchString,     
            options = {
                enableCellNavigation: false,
                enableColumnReorder: true
 			    ,syncColumnCellResize: true  
			    ,topPanelHeight: 25  
 			    ,frozenColumn: 2
            };

     
       setParams();
       init($scope.rid);
       setid();
       setGrid();
    

       $( window ).resize( function() {
           grid.resizeCanvas();
       });
    	
// ***********************************************************************************************//
//     Set  Grid Events  	
//***********************************************************************************************//

       grid.onSort.subscribe(function(e, args) {
		   var comparer = function(a, b) {
		     return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
		   }
	       dataView.sort(comparer, args.sortAsc);
	   });
       dataView.onRowCountChanged.subscribe(function(e,args) {
			grid.updateRowCount();
           grid.render();
	   });
	   dataView.onRowsChanged.subscribe(function(e,args) {
			grid.invalidateRows(args.rows);
			grid.render();			
	   });
	   dataView.onPagingInfoChanged.subscribe(function(e,pagingInfo) {
			var isLastPage = pagingInfo.pageSize*(pagingInfo.pageNum+1)-1 >= pagingInfo.totalRows;
           var enableAddRow = isLastPage || pagingInfo.pageSize==0;
           var options = grid.getOptions();
           var divSize = 2 + (options.rowHeight * (pagingInfo.pageSize +1)); 
           $("#myGrid").css( 'height' , divSize+'px' )
           if (options.enableAddRow != enableAddRow)
				grid.setOptions({enableAddRow:enableAddRow});
	   });
	   $( '#setFrozenColumn' ).click(function() {
			var val = -1;
			if ( $( '#frozenColumn' ).val() != '' ) {
				val = parseInt( $( '#frozenColumn' ).val() );
			}
			localStorage.setItem("frozenColumn" , val);
	        console.log("localStorage.getItem( frozenColumn => " + localStorage.getItem("frozenColumn")  );	 
	        grid.setOptions({ 'frozenColumn': val });
		});  
	   $("#txtSearch").keyup(function(e) {
           Slick.GlobalEditorLock.cancelCurrentEdit();
			// clear on Esc
			if (e.which == 27)
				this.value = "";
			searchString = this.value;
			dataView.refresh();
		});
       
// ***********************************************************************************************//
//    End of Set  Grid Events  	
//***********************************************************************************************//
       
       function setGrid(){    	   
    	     columns  = genericServices.getSlickHeaders($scope.data[0]); 
    	      dataView = new Slick.Data.DataView();
    	   dataView.beginUpdate();
   		   dataView.setItems($scope.data);
   		  // dataView.setFilter(myFilter);
   		   dataView.endUpdate();
   		  
   		   grid = new Slick.Grid("#myGrid", dataView, columns, options);
   		   grid.registerPlugin( new Slick.AutoTooltips({ enableForCells: true , enableForHeaderCells: true }) );

   		   var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
		  // var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
		
          // grid.setSelectionModel(new Slick.RowSelectionModel());
       }
       function setParams(){
    	  $scope.rid = $routeParams.rid;
    	  $scope.rfn = $routeParams.rfn.replace('.xls', '');
    	  $scope.resource = ""+ $routeParams.appid+"/" +$routeParams.uid+"/"+$scope.rfn;
    	  $scope.fixedcol = 6;
       }
       function init(reportid){ 
       	    var ddm ="To look for the formula check show formula and move the cursor over data.";
       	    ddm += " To look for drill down options move the cursor over data.";	
       	    toolTipServices.setDdmsg('');
         	console.log(" no cache data for " + reportid);    	
	       	if($scope.resource.indexOf(".json") < 0)
	    		   genericServices.retrieveElptData("/lteservice/getReportData/"+$scope.resource+"/"+$scope.rid);
	       	else genericServices.retrieveElptData( "/ltewebver2/reports/" + $scope.resource);
	   	    var ldata =  genericServices.getElptData(); 	
	   	    $scope.reportdata= ldata;
	   	    $scope.data =  ldata.reportdata;  
	   	    $scope.formulalist =  ldata.formulalist[0];
	   		$scope.reportInfo  =  ldata.reportinput;   	         	    	 
   	        //$scope.colheaders = genericServices.getHeaders($scope.data[0]); 
   	        console.log("data length : " + $scope.data.length); 
       }
       function setid(){
      	 for (var i = 0; i < $scope.data.length; i++) {
      	        var d = $scope.data[i] ;
      	        d["id"] = i;        
      	 }
       }
    	
    	
    	
    	
    	
    	
    	
    });
});