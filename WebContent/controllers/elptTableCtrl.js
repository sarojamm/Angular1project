 'use strict';
define(['controller' ,'jquery', 'highstock','trendline', 'exporting','bootstrap', 'jqueryui' ], function(
		 controllers, $ , highstock, trendline,exporting,bootstrap,jqueryui ) {
  controllers.controller('elptTableCtrl', function ($routeParams, $rootScope, $scope,$window,$q,
		  $location,globalUtil, exportService,sessionService, genericServices,fileUtilService, chartDataService,toolTipServices,timeUtil) { 
	  var starttime =  new Date();
	console.log(" Start time"+starttime);	
	
  	var grid,chartoption, columns, dataView , searchString = "" ,
	    options = {
 		 	 editable: true
 		    ,enableAddRow: true
 			,enableCellNavigation: false
 			,enableColumnReorder: true
 			,syncColumnCellResize: true  			
// 			,asyncEditorLoading: true
// 			,forceFitColumns: false
// 			,autoEdit: false
			,topPanelHeight: 25  
 			,frozenColumn: 2
 		},   ldata ={};
  	$scope.data=[];  
    $scope.isHome=false;
    $scope.chdata ={};  
  	$scope.chdata.selectedcharttype='line'; 
    $scope.chdata.selectedcharttype = ($scope.chdata.selectedcharttype != null )? localStorage.getItem('selectedcharttype'): $scope.chartTypes[0];
    $scope.loadmsg="";
    $scope.reportdata={}; 
	$scope.colheaders=[];
	$scope.filterheaders=[];
	$scope.columnDefs=[];
	$scope.formulalist ={};
	$scope.selectedRowdata={};
  	$scope.reportInfo = [ ] ;
  	$scope.isFormula=true;
  	$('#loading-div').show();
    $scope.loadmsg="In progress";
    angular.element(document).ready(initOnLoad);
    function initOnLoad(){
    	  setRouteParams();	
    	    globaldata();
    		getData( $scope.rid );   		 
    	
    }
  
	if(ldata == null || ldata.reportdata == null) {
		$scope.isdata=false;	
		$scope.loadmsg="No Data to Show";
	}
	else if(ldata.reportdata.length > 1){ 
		$scope.isdata=true;	
		init( );
		datasetups();
	    $scope.loadmsg="";
	}
	else if(ldata.reportdata.length == 1){ 
		console.log(" ldata.reportdata.length "+  ldata.reportdata.length);
	  	$scope.isdata= validData(   Object.keys(ldata.reportdata[0]));
	  	ldata.isdata = $scope.isdata;
		$scope.data =  ldata.reportdata; 
		$scope.loadmsg="";	  
	  	if($scope.isdata )
	  		{
	  		init( );
			datasetups();
	  		} 		
	}
	else {
		$scope.isdata=false;	
		$scope.loadmsg="No Data to Show";
	}
	 
	var endtime =  new Date();	 
	$('#loading-div').hide(); 	
	$scope.seconds = (endtime.getTime() - starttime.getTime())/1000;
	 getTotalTime();
	console.log(" Totla time in seconds => "+  $scope.seconds);
 
  
// ***********************************************************************************************//
//      Set  Grid Events  	
//***********************************************************************************************// 
 	function setGridEvents(){
		grid.onMouseEnter.subscribe( function(e, args) {  
			  var header = columns[grid.getCellFromEvent(e).cell].field;
			  var lowerheader = header.toLowerCase();
			  var upperheader = header.toUpperCase();
			  //console.log(" lowerheader  "+ lowerheader +":" +header);
		      var formula   = $scope.formulalist[header];      
		      if(formula == 'null' || formula ==  'undefined') formula   = $scope.formulalist[header];
		      if(formula == 'null' || formula ==  'undefined') formula   = $scope.formulalist[upperheader];
		      if(formula == 'null' || formula ==  'undefined') formula   = $scope.formulalist[lowerheader];
				 
			    
		      var netelements = genericServices.getDdelements();
		   	  var ddelements = genericServices.getDdelements(); 
		      var key = capitalise(columns[grid.getCellFromEvent(e).cell].field);
			  var cell = grid.getCellFromEvent(e)
			  var row = cell.row;
			  var item = grid.getData().getItem(row);  
		      var msg = "";
		      if($rootScope.isFormula === false || formula ==  'null'|| formula ==  'undefined' || (typeof formula === "undefined")){
				 msg = header;
			  }else{
			     msg = "Formula for "+  header +" is \n"+ formula;
			     toolTipServices.updateMsg2  (msg);
				 toolTipServices.showTooltip(e); 
			  }	
			  if(netelements.indexOf(header) > -1||			            			 
		        	   ddelements.indexOf(header) > -1){ 
				  //console.log(" dd msg "+ header +":" +item[header]);
		          var str = toolTipServices.updateMsg  ( item[header], header,item); 
		         // console.log(" dd msg "+str);
		          toolTipServices.showTooltip(e); 
			  }
		  });
		  grid.onMouseLeave.subscribe( function(e, args) { 
				  var msg ="";
				  toolTipServices.hideTooltip(); 
		  });
		  grid.onClick.subscribe(function (e, args) {  
				  var netelements = genericServices.getDdelements();
			   	  var ddelements = genericServices.getDdelements(); 
			      var header = columns[grid.getCellFromEvent(e).cell].field;
				  var cell = grid.getCellFromEvent(e)
				  var row = cell.row;
				  var item = grid.getData().getItem(row);          	 
			  	  if(netelements.indexOf(header) > -1||			            			 
			  	    ddelements.indexOf(header) > -1){ 
			 		  var key = capitalise(header);
			 		  var str = toolTipServices.updateMsg  ( item[header], header,item); 
					  $scope.selectedRowdata = item;
			    	  	 str += setParams(key, item[ header]);
					     var ddbaseurl = genericServices.getBaseUrl()+"/"+$routeParams.appid+"/c2ddReport.htm?" + 
				  		"ReportId=" + $scope.rid + 
				  		"&ReportLevel="+$scope.rl+ "&LowestReportLevel="+$scope.lrl+
				  		"&SiteAggFlag=true&LowerEnodeB="+item["SITE"] + "&"+str+ 
				  		"&InitialEntry=N&ReportTitle="  + $scope.pagetitle+
				  		"&isnew=true&session.status=valid&session.userid="+$rootScope.loginuid+"&reportuid="+$rootScope.reportuid  ; 
				  		 console.log( "redirect URL =>   " +ddbaseurl);	
				  		 genericServices.redirectSIte(ddbaseurl);
			  	  }				   
			  });   
 		 grid.onSort.subscribe(function(e, args) {
			   var comparer = function(a, b) {
			     return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
			   }
		       dataView.sort(comparer, args.sortAsc);
		   });

		// wire up model events to drive the grid
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

		// wire up the search textbox to apply the filter to the model
		$("#txtSearch").keyup(function(e) {
            Slick.GlobalEditorLock.cancelCurrentEdit();
			// clear on Esc
			if (e.which == 27)
				this.value = "";
			searchString = this.value;
			dataView.refresh();
		});	 
 	}
	function myFilter(item) { 		
 		if (searchString == "") return true;
 		var isfound = false;
 		 
          for (var i = 0 ; i < $scope.filterheaders.length ; i++){
         	 var key = $scope.filterheaders[i] ;
         	  if(item[ $scope.filterheaders[i]].indexOf(searchString) != -1){
         		isfound =  true;
         		break;
         		
         	 }
          }
 		return isfound;
	}
// ***********************************************************************************************//
//      local Functions
 //***********************************************************************************************// 
	   function validData(  cols){
		   var valid = false;
			 var ddelements = genericServices.getDdelements();
	 	   	 var netelements = genericServices.getNetelements();
		   for (var i = 0 ; i < cols.length ; i++){
	           	 var key = cols[i];
	           	 if(netelements.indexOf(key) > -1||
	           		ddelements.indexOf(key) > -1 )
	           		valid = true;	           		 
	            }  
		   return valid;
		   
	   }
	   function globaldata(){
		   $scope.absUrl = escape($location.absUrl()); 
		   console.log("scope.rid" + $scope.absUrl);
		   if($scope.rfn == null) $scope.rfn ='maperror_10172014163148'; // send back to message page.
		   if($scope.rt == null )$scope.rt = " Report: " + $scope.rfn;
		   if ($routeParams.appid != null) 
			  $rootScope.appid = (($routeParams.appid in $rootScope.normalize)  ?  $rootScope.normalize[$routeParams.appid] : $routeParams.appid) ;
			  sessionService.setAppid( $rootScope.appid);
			  sessionService.setAppName( $rootScope.titles[$rootScope.appid]);
			  $scope.title= sessionService.getSiteTitle();	
			  $scope.appid= $rootScope.appid ;
		   $scope.pagetitle= $routeParams.appid +" - "+$scope.rt;	 
				
		   //'/reports/:isdd/:appid/:uid/:rid/:rfn/:rl/:isar/:rt/:lrl' 
		   console.log("scope.rid" + $scope.rid);
		   // $scope.resource = ""+$scope.rfn; use this to test with local file
		   console.log("scope.resource  " + $scope.resource);    
	  }
	  function datasetups(){
			console.log(" $rootScope.tableoptions " + $rootScope.tableoptions);
			if($rootScope.tableoptions === false){		
		 		chartoption = 'ddchart';
		 		$( "#tabletab" ).addClass( "" );
				$( "#charttab" ).addClass( "active" );
				$( "#slicktabletab" ).removeClass( "tab-pane active" ).addClass( "tab-pane" );
			}	
			if( chartoption === 'ddchart') {	
				$( "#slicktabletab" ).removeClass( "tab-pane active" ).addClass( "tab-pane" );
				$( "#chart" ).addClass( "tab-pane active" );
				$( "#tabletab" ).addClass( "" );
				$( "#charttab" ).addClass( "active" );
				$rootScope.tableoptions  =  false ;		
			}	
			setSliders();	
			setLinkURLs();	
	 }
	 function getTotalTime(){	    	
	    	var hourDiff = endtime - starttime; //in ms
	    	var secDiff = hourDiff / 1000; //in s
	    	var minDiff = hourDiff / 60 / 1000; //in minutes
	    	var hDiff = hourDiff / 3600 / 1000; //in hours
	    	var humanReadable = {};
	    	humanReadable.hours = Math.floor(hDiff);
	    	humanReadable.minutes =  Math.floor( minDiff - 60 * humanReadable.hours);
	    	humanReadable.seconds  = Math.floor( secDiff - 60 * humanReadable.minutes);;    
	       $scope.seconds = "" + hourDiff+ " ms | " +   humanReadable.hours  + " h : " +   humanReadable.minutes    +" m : " +humanReadable.seconds + "sec";
	 }
 	 function setRouteParams(){
     	$scope.rfn = $routeParams.rfn.replace('.xls', '');
     	$scope.rid = $routeParams.rid;
     	//$rootScope.uid =  $routeParams.uid;   
     	$rootScope.loginuid =  $routeParams.loginuid;   
     	sessionService.setLoginUid  ($routeParams.loginuid );
     	$rootScope.reportuid =  $routeParams.reportuid;   
     	$scope.loginuid = $routeParams.loginuid;
    	console.log(" $rootScope.loginuid " + $rootScope.loginuid);  
    	console.log(" $scope.loginuid " + $scope.loginuid); 
    	console.log(" $rootScope.reportuid " + $rootScope.reportuid); 
     	chartoption = $routeParams.isdd;     	
     	if( $routeParams.isdd == 'dd' || $routeParams.isdd == 'ddchart') {
     		$scope.rt= $routeParams.rt.replace('LTE Reports', '');; 		
     		$scope.rl= $routeParams.rl;	
     		$scope.lrl = $routeParams.lrl;
     	}
     	$scope.resource = ""+ $routeParams.appid+"/" +$routeParams.reportuid+"/"+$scope.rfn;	
     }	 	 
 	 function getData( reportid ){
 		console.log(" no cache data for " + reportid);    	
 		if($scope.resource.indexOf(".json") < 0)
	 	   genericServices.retrieveElptData("/lteservice/getReportData/"+$scope.resource+"/"+$scope.rid);
	    else genericServices.retrieveElptData( "/reports/" + $scope.resource);
 		  ldata =  genericServices.getElptData(); 
 	    $scope.reportdata= ldata; 		  
 	 } 	 
     function init(){   
    	 var deferred = $q.defer();
    	    $scope.data =  ldata.reportdata;  
    	    columns  = genericServices.getSlickHeaders($scope.data[0]); 	   
 		     
 		    var ddm ="To look for the formula check show formula and move the cursor over data.";
	    	ddm += " To look for drill down options move the cursor over data.";	
	    	toolTipServices.setDdmsg('');
	    	
 		    $scope.formulalist =  ldata.formulalist[0];
 			$scope.reportInfo  =  ldata.reportinput;
 		    $scope.fixedcol = 6;	    	 
 		    $scope.colheaders = genericServices.getHeaders($scope.data[0]); 
 		    var list =  genericServices.getHeadersArr($scope.data[0]); 
 		    var netelements = genericServices.getNetelements();
 		    for (var i = 0 ; i < list.length ; i++){
          	   var key = list[i] ;
          	   if (netelements.indexOf(key) > -1)  $scope.filterheaders.push(key);          	 
            }  
 		    setid();
   		    setGrid();
   		    setGridEvents();
   		    getFilename();	
   		    globalUtil.setLocalStorage();  
   		    globalUtil.getGridHight();
   		    $rootScope.title =  $rootScope.titles[$routeParams.appid] + " LTE Performance Tool";    		  
   		    $scope.title = $rootScope.title;
  		    console.log("data length : " + $scope.data.length); 
  		  return deferred.promise;
 	    }  
 		function setLinkURLs(){
 	    	var dataResourceName =genericServices.getBaseUrl()+"/reports/"+$routeParams.appid+"/" +$routeParams.reportuid+"/"+$scope.rfn+".xls";
 	    	$scope.chartUrl = $location.absUrl().replace("/reports/dd/", "/reports/ddchart/");
 	    	console.log(" chartUrl => " + $scope.chartUrl);
 	    	console.log(" absUrl => " + $scope.absUrl );
 	    	$scope.mapurl = genericServices.getBaseUrl()+ '/mapdisplay/mapDisplay.htm?dataResourceName='+dataResourceName +'&tool=lte';
 	        // append the LTE column names of columns whose names differ from those used for NPT.
 	    	// Need to make it more generic
 	        $scope.mapurl += '&btsH=ENODEB&siteH=SITE&secH=EUTRANCELL&freqH=CARRIER';
 	        $scope.editurl = genericServices.getBaseUrl()+"/"+ $routeParams.appid+"/reportBuilder.htm?reportId="+$scope.rid+
 	                         "&isnew=true&session.status=valid&session.userid="+$rootScope.loginuid+"&session.reportuid="+$rootScope.reportuid ;       
 	        
 	       var resource =genericServices.getBaseUrl()+"/reports/"+$routeParams.appid+"/"+$rootScope.reportuid +"/"+$scope.rfn+".xls";
 	       $scope.appleturl = genericServices.getBaseUrl()+"/"+ $routeParams.appid+"/applets/lte/jTableApplet.jsp?" +
 	                                    "dataResourceName="+ resource;
 	       // http://mydummysite.com:8080/elte/applets/lte/jTableApplet.jsp?dataResourceName=http://vaculptpa16.nss.vzwnet.com:8181/reports/elte/c0ammsa/sah-c0ammsa-Fri_Apr_15_15_36_29_EDT_2016_04152016153630.xls
 	        $scope.pdfurl =genericServices.getBaseUrl()+"/"+ $routeParams.appid+"/createpdf?fileName="+dataResourceName; 	        
 	        $scope.csvurl =genericServices.getBaseUrl()+"/"+ $routeParams.appid+"/createcsv?fileName="+dataResourceName;
 	        $scope.xlsurl =dataResourceName; 	        
 	    }
 	    function setParams(key, value){
 	   	 var str1 ="";
 	   	 var cols = $scope.colheaders;	
 	   	 var ddelements = genericServices.getDdelements();
 	   	 var netelements = genericServices.getNetelements();
 	            for (var i = 0 ; i < cols.length ; i++){
 	           	 var key = cols[i].sName;
 	           	 if(netelements.indexOf(key) > -1||
 	           		ddelements.indexOf(key) > -1 )
 	           		str1 += "&"+capitalise(key.trim())+"="+$scope.selectedRowdata[key]; 
 	            }  
 	        return  str1;
 	   }     
 	   function capitalise(string) {
 	        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
 	   } 
 	   function getFilename(){
 			var d = new Date();
 			var m = (d.getMonth() +1 );
 				m = ( m < 10 )  ? "0"+m:m;
 			$scope.filename = $scope.rfn +"_"+d.getFullYear()+m+d.getDate()+d.getHours()+d.getMinutes()+d.getSeconds() +".";
 			console.log("new " + $scope.filename); 
 		}
 	    
 	    
 	   function setid(){
 	    	 for (var i = 0; i < $scope.data.length; i++) {
 	    	        var d = $scope.data[i] ;
 	    	        d["id"] = i;        
 	    	 }
 	  }
 	  function setGrid(){
 			dataView = new Slick.Data.DataView();
 			dataView.beginUpdate();
 			dataView.setItems($scope.data);
 			dataView.setFilter(myFilter);
 			dataView.endUpdate();
 			grid = new Slick.Grid("#myGrid", dataView, columns, options);
 			 
 	        grid.setSelectionModel(new Slick.RowSelectionModel()); 
 	        var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
 			var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
 			grid.registerPlugin( new Slick.AutoTooltips({ enableForCells: true , enableForHeaderCells: true }) );
 	 		resizeGrid();
 			
 			$( '#frozenColumn' ).val( options.frozenColumn );
 			$('#myGrid').on('shown', grid.resizeCanvas());
 			resizeGrid(); 				
 		}
 		
// ***********************************************************************************************//
//     onclick Functions
//***********************************************************************************************// 		
      $scope.exportfile = function (type){		
 			exportService.exportJsontoCSV.apply(this, [ $scope.filename,type,$scope.data]); 
 	  }
 	  $scope.setTableOption = function (option){		
 		  $rootScope.tableoptions= option; 	  
 		  localStorage.setItem("tableoptions" , option);
 	      console.log("localStorage.getItem( tableoptions => " + localStorage.getItem("tableoptions")  );     	
 	      resizeGrid();  
 	    // setGrid();
 	  }	
// ***********************************************************************************************//
//    Slider  Functions
//***********************************************************************************************// 
 	   function setSliders(){ 
 		  $( "#slidfrozencol" ).slider({orientation: "horizontal", range: "min", value: 3, min:1, max: 7, slide: setFrozenCol, change: setFrozenCol });
 	 	  $( "#slidpgtxtsz" ).slider({orientation: "horizontal", range: "min", value:  $rootScope.selectedPageTxtSize, min:8, max: 25,   slide: setPageTextSize, change: setPageTextSize });
 	   } 	       
 
 	  function setPageTextSize(){
 		  setTextSize("#slidpgtxtsz","selectedPageTxtSize", "body");
 	  }	    
 	  function setTextSize(key , lkey, dclass) {
		  var value =  $( key ).slider( "value" ) ;
		  localStorage.setItem(lkey.replace("#","") , value);
          $(dclass).css("font-size", value+ "px");
	   } 
 	   function setFrozenCol(){
 		  var val = -1;
 		  var value =  $( "#slidfrozencol" ).slider( "value" ) ; 
		  if (value != '' ) {
				val = parseInt( value );
		  }
		  localStorage.setItem("frozenColumn" , val);
	      grid.setOptions({ 'frozenColumn': val });
 	   } 	    
// ***********************************************reen ************************************************//
//      watch value changes  	
//***********************************************************************************************// 	 		
 	  function resizeGrid(){ 
 		  var winh = $(window).height() ;
 			  var headh = $( "#head" ).height();
 			  var opth = $( "#ltewrapper" ).height();
			 var hight = (winh -(headh +27) );			 
		 hight = ($scope.isMenu) ? (hight -opth):hight;
         $rootScope.gridheight =  hight;
         $rootScope.gridwidth= $(window).width()-30;
   	    $("#myGrid").css( 'min-height' , $rootScope.gridheight+'px' );
   	    $("#myGrid").css( 'max-height' , $rootScope.gridheight+'px' );
   	    $('#myGrid').css({'width':  $rootScope.gridwidth+'px'});      	   
   	    $("#myGrid").css( 'height' , $rootScope.gridheight+'px' );
   	   
   	
   	  //setGrid();
   	  grid.resizeCanvas();     	   
      } 			
 	  $(window).resize(function(){ 	    	  
         	resizeGrid();  
     	}); 	 
 		$scope.$watch('isFormula', function(newValue, oldValue ) {
	      	 if(newValue ==  oldValue  )return; 
	      	 $rootScope.isFormula = newValue;
	      	$scope.isFormula=newValue;
	         localStorage.setItem("isFormula" , newValue);
	         console.log("localStorage.getItem( isFormula => " + globalUtil.getLocalStorageValue("isFormula")  );	      	  
	    }); 
 		$scope.$watch('isMenu', function(newValue, oldValue ) {
	      	 if(newValue ==  oldValue  )return;   
	      	 $rootScope.isMenu = newValue;
	         localStorage.setItem("isMenu" , newValue);
	          
	         resizeGrid();
	    });  
// ***********************************************************************************************//
//      end of watch value changes  	
//***********************************************************************************************//  		
  });
});