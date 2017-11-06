'use strict';

define(['directive', 'jquery' ], function(directives ,$) {
  directives.directive('baseTable', function( sessionService, globalUtil,genericServices,toolTipServices, chartDefService ,chartDataService,timeUtil) {
    return {
     restrict: 'A', 
     transclude: true,
     replace: true,
     templateUrl: 'common/directives/basetable/baseTable.html',
     controller: function($scope , $rootScope,  $attrs,$location,$window,   $http) { 
        $scope.tabletitle =  $scope.$eval($attrs.tbltitle);    
        console.log("table title is" +  $scope.tabletitle)
        $scope.iscrud =  $scope.$eval($attrs.iscrud); 
        $scope.filterheaders=[];
        $scope.reportId =$scope.$eval($attrs.reportId);  
        $scope.resultdata =  $scope.$eval($attrs.data);      
//        console.log( " $attrs.isview  " +  $attrs.isview )
//  	    console.log( " $attrs.isrun  " + $attrs. isrun )
//  	    console.log( " $attrs.isdel  " + $attrs. isdel )
        $rootScope.isview =  (  $scope.$eval($attrs.isview) ) ? true:false;
        $scope.isrun   =  (  $scope.$eval($attrs.isrun)) ? true:false;
        $scope.isdel   = (  $scope.$eval($attrs.isdel) ) ? true:false;
        var refresh=30;
        var grid;
        var dataView,searchString ="" ;         
        var starttime =  new Date();
        var reportInfoUrl="";
       // getData(  );    
        var list =  genericServices.getHeadersArr($scope.resultdata[0]); 
		    var netelements = genericServices.getNetelements();
		    for (var i = 0 ; i < list.length ; i++){
      	       $scope.filterheaders.push(list[i]);          	 
        }  
        resizeGrid("#eleDetails",100);  
     	$('#loading-div').show();
        angular.element(document).ready(initOnLoad);
        function initOnLoad(){ 
        		getData(  );           		
        }	
    	var endtime =  new Date();	 
    	$('#loading-div').hide(); 	
    	$(".slick-row").click( function(){
    	    $(this).css("background-color", "#FBB");
    	});
    	$scope.seconds =timeUtil.getTotalTime (endtime, starttime);
    	console.log(" Totla time in seconds => "+  $scope.seconds); 
        var options = {
        	    editable: true,
        	    enableAddRow: true,
        	    enableCellNavigation: false,
        	    asyncEditorLoading: false,
        	    enableColumnReorder: true,
        	    syncColumnCellResize: true  ,	
        	    forceFitColumns: true,
        	    autoEdit: false
        	    //,frozenColumn: 2
         }; 
           
           
		    setGrid();
		    setGridEvents();
		   
		  

// ***********************************************************************************************//
//      Set Grid and  Grid Events  	
//***********************************************************************************************// 
 function setGrid() { 	 
      dataView = new Slick.Data.DataView();
      refreshDataView(); 
	  grid = new Slick.Grid("#showTable", dataView, $scope.columns, options); 
	  grid.setSelectionModel(new Slick.RowSelectionModel());
	  var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
	  var columnpicker = new Slick.Controls.ColumnPicker($scope.columns, grid, options);
	  grid.registerPlugin( new Slick.AutoTooltips({ enableForCells: true , enableForHeaderCells: true }) );
	  $('#showTable').on('shown', grid.resizeCanvas());
	  resizeGrid("#showTable",10); 
	  console.log(" Grid is defined !!!! ");
 }

 function setGridEvents(){
 		 grid.onSort.subscribe(function(e, args) {
			   var comparer = function(a, b) {
			     return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
			   }
		       dataView.sort(comparer, args.sortAsc);
		});
 		grid.onMouseLeave.subscribe( function(e, args) { 			 
			  toolTipServices.hideTooltip(); 
	   });
 	   grid.onMouseEnter.subscribe( function(e, args) {  
			  var row = grid.getCellFromEvent(e).row;			  	 
		     // var report =  grid.getData().getItem(row)["report"];
//			  if( report ==  'undefined' || (typeof report === "undefined")){
//		    	  report = grid.getData().getItem(row);
//		      }
			  var report = grid.getData().getItem(row);		     
		      var val =" ";
		      for (var key in report) {
		    	  if(key != "eldist")
				      val +=   (report.hasOwnProperty(key) ?  ("    " + key + " => "+  report[key] ) : "")  ;				  	  
			 }		
		     if( val.length > 1  ){
					 toolTipServices.updateMsg2  (val);  
					 toolTipServices.showTooltip(e);  
					// reportInfoUrl+= capitalizeFirstLetter(report.eldist[0].listElementType);					
		      }
		   //  else    reportInfoUrl+="none"
	   });
 	   grid.onClick.subscribe(function (e, args) {   
 		  var item = dataView.getItem(args.row);
 		  console.log(" selected column is => " +  $scope.columns[args.cell].name); 
 		  var headername =$scope.columns[args.cell].name;
 		  console.log("  field  =>  " + args.grid.getColumns()[args.cell].field);
 		 if (args.grid.getColumns()[args.cell].field == 'del') {
 		       /*   // perform delete
 		       // assume delete function uses data field id; simply pass args.row if row number is accepted for delete
 		       dataView.deleteItem(args.grid.getDataItem(args.row).id);
 		       args.grid.invalidate();*/
 			  // alert("Do we need Delete  feature. If so comming soon!!!! ");
 		    }
 		 else  if (args.grid.getColumns()[args.cell].field == 'run') {
  		        /*   // perform delete
		       // assume delete function uses data field id; simply pass args.row if row number is accepted for delete
		       dataView.deleteItem(args.grid.getDataItem(args.row).id);
		       args.grid.invalidate();*/
				// alert("Do we need Run the report again feature. If so comming soon!!!! ");
		 } 		  
 		 else  if( headername === "location" || args.grid.getColumns()[args.cell].field == 'view'){
 			 // alert("  we like to view the previously generated report. Here it is !!!! ");
 			  var ddbaseurl =(item["location"]);
 			  ddbaseurl = ddbaseurl.replace("/reports/", "/ltewebver2/#/reports/nodd/") +"/"+item.reportId +"/"+$rootScope.loginuid; 		 
 			   console.log("$rootScope.loginuid " + $rootScope.loginuid +"item[report].reportId =>"+ item.reportId  + "  ddbaseurl => " +  ddbaseurl); 			   
 			   genericServices.redirectSIte(ddbaseurl);
 		  } 		
 		  else if( headername === "Formula")  openDialog(item[headername]); 		   
 		  else {  
 		 	 console.log("reportInfoUrl  " +  reportInfoUrl);
 		 	 args.grid.setCellCssStyles("highlight", item);
 		 	 args.grid.render();
 		 	 reportInfoUrl="/ltewebver2/#/reportInfo/"+item.reportId+"/" ;		     
 		 	 genericServices.redirectSIte(reportInfoUrl); 
 		 }
 		  toolTipServices.hideTooltip();		  
 	   }); 
 	   var openDialog = function(msg){ 	 
 		        if(msg != ""){
 		        	  var dom = "<div>" +msg + "</div>"; 		
 		 			  $(dom).dialog();
 		        } 	          
 		};
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
          $("#showTable").css( 'height' , divSize+'px' )
          if (options.enableAddRow != enableAddRow)
				grid.setOptions({enableAddRow:enableAddRow});
		});
		// wire up the search textbox to apply the filter to the model
		$("#txtSearch2").keyup(function(e) {
            Slick.GlobalEditorLock.cancelCurrentEdit();
			// clear on Esc
			if (e.which == 27)
				this.value = "";
			searchString = this.value;
			dataView.refresh();
		});	  
      }
	 
 
// ***********************************************************************************************//
//   End of  Set  Grid Events  	
//***********************************************************************************************//   
// ***********************************************************************************************//
//  Start of Local Functions
//***********************************************************************************************//    
function myFilter(item) { 		
 	if (searchString == "") return true;
 	var isfound = false;
 	for (var i = 0 ; i < $scope.filterheaders.length ; i++){
 	   var value= ""+ item[$scope.filterheaders[i]];
 	   if(value.indexOf(searchString) > -1){
 	      isfound =  true;
 	      break;		         		
 	   }
 	}
 	return isfound;
}    
function setid(){
   for (var i = 0; i < $scope.resultdata.length; i++) {
	    var d = $scope.resultdata[i] ;
      d["id"] = i;   
  }   
}
function getData(  ){ 
	 $scope.columns =genericServices.getSlickHeaders($scope.resultdata[0],0); 
	 console.log("data length : " + $scope.resultdata.length);    
} 
function requiredFieldValidator(value) {
	if (value == null || value == undefined || !value.length) {
	      return {valid: false, msg: "This is a required field"};
	} 
	else {
	      return {valid: true, msg: null};
	}
}
function capitalizeFirstLetter(string) {
 	string = string.toLowerCase();
    string = string.replace("_","");
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function refreshDataView(){
    console.log("start refreshDataView!!!!" );
    setid();
    dataView.beginUpdate();
    dataView.setItems($scope.resultdata); 	 	  
 	dataView.setFilter(myFilter);
 	dataView.endUpdate();
  	dataView.refresh(); 
 	console.log("end refreshDataView!!!!" ); 	
}
function refreshGrid(){
	grid.invalidate();
	grid.render(); 
	refresh =(( refresh==40 ) ? 45:40);	
	resizeGrid("#showTable",refresh); 
	grid.resizeCanvas();  
}
function resizeGrid(mydiv,ht){ 
	 globalUtil.getGridHight("#"+$attrs.windid);
     $(mydiv).css( 'min-height' , ($rootScope.gridheight-ht)+'px' );
     $(mydiv).css( 'max-height' ,  ($rootScope.gridheight-ht)+'px' );
     $(mydiv).css({'width':  $rootScope.gridwidth+'px'});      	   
     $(mydiv).css( 'height' ,  ($rootScope.gridheight-ht)+'px' );     
     if ( ht == 10 )grid.resizeCanvas();     	   
} 
$(window).resize(function(){ 	    	  
 	resizeGrid("#showTable",10); 
}); 	
// ***********************************************************************************************//
//End  of Local Functions
//***********************************************************************************************//    
// ***********************************************************************************************//
//Start of Watch events
//***********************************************************************************************//    

//$scope.$watch('resultdata', function(newValue, oldValue ) {
//     	if(newValue ==  oldValue  )return;      	 
//        console.log("  $scope.resultdata => "    );      
//        refreshDataView(); 
//        refreshGrid();   
//        $scope.columns =genericServices.getSlickHeaders(newValue[0],0);      
//        setid();
//	    setGrid();
//	    setGridEvents(); 	   
//   });
$scope.$watch('isMenu', function(newValue, oldValue ) {
     	 if(newValue ==  oldValue  )return;   
     	 $rootScope.isMenu = newValue;
        localStorage.setItem("isMenu" , newValue);
//        globalUtil.getChartHight();
        globalUtil.getGridHight("#slicktabletab");
        resizeGrid("#showTable",10);
});  
//$scope.$watch('rptInstancedata', function(newValue, oldValue ) {
//   	if(newValue ==  oldValue  )return; 
//      $scope.time = new Date();
//      $scope.resultdata = newValue; 
//	  $scope.isview = true;      	 
//});
//***********************************************************************************************//
//End of Watch events
//***********************************************************************************************//    
  
    } 
   };
 });
});