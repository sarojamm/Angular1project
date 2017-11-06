'use strict';

define(['directive', 'jquery' ], function(directives ,$) {
  directives.directive('stockChart', function(  globalUtil,genericServices, chartDefService ,chartDataService) {
    return {
     restrict: 'A',
     replace: false,
     ransclude: true,
     templateUrl: 'common/directives/charts/chart.html',
     controller: function($scope , $rootScope,  $attrs,$location) { 
        $scope.pagetitle =  $scope.$eval($attrs.chTitle); 
        $scope.resultdata =  $scope.$eval($attrs.resultdata);
        $scope.chdata =  $scope.$eval($attrs.allchdata);   	
        if ( $scope.resultdata != null ){
            $scope.data = $scope.resultdata.reportdata;    	        
   	        $scope.stockchart = chartDefService.getScatterchart() ;
	        $scope.stockchart.series = [];	
	        $scope.stockchart.chart.type= 'line';
	        $scope.stockchart.title.text = $scope.pagetitle;
	        $scope.stockchart.chart.height = $rootScope.chartheight;
	        $scope.chdata.selectedlaxis=[];
   	        $scope.chdata.selectedraxis=[];
   	        $scope.chdata.selecteddataset=[];
   	        $scope.seriesdata =[];
	        $scope.legendvalues =[];	        
	        $scope.raxis =[];
	        $scope.colors =['blue','red','orange','green','gray','black'];
	        $scope.laxis =[]; 
	        $scope.chdata.currselecteddataset=[];
	        $scope.datasetstoshow =[];
	        $scope.stockchart.seriesbck=[];	        
	        globalUtil.setLocalStorage();
	       // globalUtil.getChartHight();	       
//	        $scope.chartheight= percentCalculation($( window ).height(),75);
//	        $scope.chartwidth = percentCalculation($( window ).width(), 75);
		 		        
	      if($scope.isdata )  {	    	  
	    	   setChartData(); 
		       populateData();
	       }
        }
     //   else $scope.isdata=false;
        function percentCalculation(a, b){
        	  var c = a*(b/100);
        	  return c;
        	}   
	   var chart; 
	   function setChartData(){
//			   $scope.chdata.datasets = chartDataService.getDatasets($scope.resultdata.dataset);
		       $scope.chdata.data     = $scope.resultdata.reportdata;
		       $scope.chdata.datasets = chartDataService.getDatasets(  $scope.chdata.data ); 
			     
	  	       $scope.chdata.cats     =  $scope.resultdata.dateset ;
	           $scope.datasets        =   $scope.chdata.datasets;//used in the charts          
	           $scope.chdata.yaxis = [];
	           var i = 0;
	           while(  $scope.chdata.yaxis.length == 0 || i < 2 ){	   
	        	 if(  $scope.resultdata.reportdata.length >  i ){
	        		 if ($scope.chdata.data[i]['DAY'] === 'Total'){
		        		   i++;
		        		   continue;
		        	   }else {
		        		   genericServices.getProps1($scope.chdata.data[i]);
				           $scope.chdata.yaxis = genericServices.getNumprops();		        		 
		        	   }	
	        	      
	        	 }
	        	  i++;  
	           }
	           $scope.yaxis =$scope.chdata.yaxis;
	           $scope.chartTypes = genericServices.getChartTypes();
	           $scope.chdata.selectedcharttype = ($scope.chdata.selectedcharttype != null )? localStorage.getItem('selectedcharttype'): $scope.chartTypes[0];
			   $scope.stockchart.chart.type = $scope.chdata.selectedcharttype;	
	           console.log(" ser chart data. ");
	   }
       function populateData(  ){    	  
    	   console.log(" First key in get dataset values =>" + $scope.chdata.datasets[0].name);
	    	 var dataset =
	     	    chartDataService.getValuesForDataset( $scope.data, $scope.chdata.datasets[0].name);	    	 
	    	 $scope.chdata.currselecteddataset.push($scope.chdata.datasets[0]);
	    	 var  datakey = $scope.chdata.datasets[0].name +":"+$scope.chdata.yaxis[0].name;
	     	 var key =  datakey+"[0]";
	    	 $scope.datasetstoshow.push(key);
	    	 addlegendvalue(key);
	     	 $scope.laxis.push($scope.chdata.yaxis[0].name);
	     	 $scope.seriesdata[datakey]= getStockData(dataset, $scope.chdata.yaxis[0].name);
	     	 if($scope.chdata.yaxis.length > 1){
	     		 datakey = $scope.chdata.datasets[0].name +":"+$scope.chdata.yaxis[1].name;
	     		 key = datakey +"[1]";  
		    	 addlegendvalue(key);
		    	 console.log(" Second key in get dataset values =>" + $scope.chdata.yaxis[1].name);
		    	 $scope.seriesdata[datakey]= getStockData(dataset,$scope.chdata.yaxis[1].name);
		    	 $scope.datasetstoshow.push(key);
		    	 $scope.raxis.push($scope.chdata.yaxis[1].name); 
	     	 }  
//	     	 updatechart();
	     	 refreshChart();
	    	 console.log(" ser populateData data. ");
	   } 	 	   
      
      
       function getjsonItem(key){
    	   var name ="name";
    	   var jsonItem = {}; 
    	   jsonItem[name] = key; 
    	   return jsonItem;
       }
       function getStockData(dataset, name){
    	   var stockdata =[]; 
    	   for(var i in  dataset){
    		   var srcitem = dataset[i];
    		   var item=[];	            		  
    		   item.push(srcitem["time"]);
	           item.push(srcitem[name]);
	           stockdata.push(item);
	       }
	       return stockdata;
	   } 
 
   
   function isInAxis(name){
	 	  if($scope.raxis.indexOf( name ) > -1 ||
	 		 $scope.laxis.indexOf( name ) > -1)  return true;
	 	  else return false;
   }
   function isExists(list, item){
 	  for(var i in list){
 		  if(list[i].indexOf(item) > -1)
 			return true;
 	  }
 	 return false; 
   }
   function basicChart(isbasic){
		console.log(" is basicChart. " + isbasic);	    	 
		$rootScope.isTrend = isbasic;
		$rootScope.isLegend= isbasic;
	  //  $scope.stockchart.plotOptions.scatter.tooltip.enabled = isbasic;
	    $scope.stockchart.rangeSelector.enabled= isbasic ;  
   }
   $(window).resize(function(){
//	 	 globalUtil.getChartHight();
//	     $rootScope.wwh = $( window ).width() +" : " +$(window).height() ;
//	     $( "#chartleftoption" ).css( 'height' , $rootScope.chartheight+'px' );  
    	     //updatechart();
    	     refreshChart();
     	});
    
	  
   function updatechartdata(){ 	    	   
	   if($scope.stockchart.series == null) $scope.stockchart.series = $scope.seriesbck;
	   $scope.stockchart.yAxis[0].title.text ="";
       $scope.stockchart.yAxis[1].title.text ="";
       var datasetnames = _.uniq(_.pluck($scope.legendvalues, "name"));
       printStats();
       $.each(datasetnames, function( index, key ) {
    	   var datakey = key.split("[")[0];
    	   if( $scope.seriesdata.hasOwnProperty(datakey)){
               console.log(key + " alreADY exists")
    	   }
    	   else{
    		   var vals =  key.split(":") ;
    		   var val1 = vals[0];
    		   var val2 =  vals[1].split("[")[0];
    			 console.log(" First key in get dataset values =>" + val1); 
    			 console.log(" Second key in get dataset values =>" + val2);   			    
    	       var dataset = chartDataService.getValuesForDataset( $scope.data, val1);
    		   $scope.seriesdata[datakey]= getStockData(dataset,val2);
    	   }
       }); 
   }  
   
   
   
//datasetstoshow: ["Alaska-Alaska-008-ALASKA_GROUNDWORKS:Setup_Fail%[0]","Alaska-Alaska-008-AUKE_BAY:Setup_Fail%[0]",
//	               "Alaska-Alaska-008-ALASKA_GROUNDWORKS:Setup_Fail%_Num[1]","Alaska-Alaska-008-AUKE_BAY:Setup_Fail%_Num[1]"]
//	       $scope.seriesdata : key=>      Alaska-Alaska-008-ALASKA_GROUNDWORKS:Setup_Fail%[0] values:  [[1422144000000,0]],[], ... [1422226800000,0]]
	       
     function refreshChart( ){	 
	       $scope.stockchart.series = [];
	       $scope.stockchart.yAxis[0].title.text ="";
	       $scope.stockchart.yAxis[1].title.text ="";
	       printStats();
	       var j = 0
	       $.each( $scope.datasetstoshow, function( index, val) {	    	   
	    	   $scope.isselectmsg=false;
	    	   var name = val.split("[")[0]; 
	   	    
		   var data1 = $scope.seriesdata[name];
	       console.log ("data1 lenght : " + data1.length + "val : " + val +" $scope.seriesdata length : " + $scope.seriesdata[name].length);
	       j = (val.indexOf("[0]") > 0) ? 0:1;  
	       $scope.stockchart.yAxis[j].title.text = name.split(":")[1]; 
	       var colind = $scope.colors.length;
	       var ind =0;
	       $scope.stockchart.series.push({name: name,
		      	//, type:$scope.multitypes[multiindex++],
		      	regression:  $rootScope.isTrend ,
		        regressionSettings: {
		            type: 'linear',
		            color:   Highcharts.getOptions().colors[$scope.colors[ind++]]
		         },
		         data: data1,
		         color: Highcharts.getOptions().colors[$scope.colors[ind++]]  ,
		         yAxis:j });			         
		   });      
		   $scope.stockchart.legend.enabled = $rootScope.isLegend;
		   $scope.stockchart.seriesbck = $scope.stockchart.series;		      
		   setChartsize();
		   Highcharts.setOptions({
		        global: {		        	 	
		    			useUTC: false		    		
		        }
		    });
		   new Highcharts.StockChart($scope.stockchart);	
     }
     function setChartsize(){
    	  if($rootScope.isMenu )  $scope.stockchart.chart.height = $( window ).height() - ($( "#head" ).height() +$rootScope.borderhights +$( "#ltewrapper" ).height());	
		  else  $scope.stockchart.chart.height = $( window ).height() - ($( "#head" ).height() +$rootScope.borderhights +20);	
    	 
    	  if($( "#chartcontainer" ).width() > 100  )
    		  $scope.stockchart.chart.width =  $( "#chartcontainer" ).width()  - ($rootScope.borderwidth +20);  
    	  else  $scope.stockchart.chart.width =  percentCalculation($( window ).width(), 75);
		  
     }
	  function addAxis(newValue, lr, axis) {
	     var refreshchart = false;
	    
	     $.each(newValue,function(index,value) {
			if (isInAxis(value.name)) {
				console.log(value.name + " is in one of the axis ");
				return;

			} else {
				// $scope.legendvalues.push(getjsonItem(value));
				axis.push(value.name);
				refreshchart = true;
			}
		 });
		 if (refreshchart) {
		 	axis = _.uniq(axis); 
			cleanaddlegendvalue2()
			setDatasetstoshow();
			updatechartdata();
			refreshChart()
		 }
	  } 
	  function cleanaddlegendvalue2(){    	   
		  $scope.legendvalues=[];
		  var datasetnames = _.pluck($scope.chdata.currselecteddataset, "name");
		 		 		 	
		 	 $.each(datasetnames, function( index, value ) {
			       $.each($scope.laxis, function( index, value2 ) {
			          var key = "" + value +":"+value2 +"[0]";
			         // $scope.datasetstoshow.push(key)
			          $scope.legendvalues.push(getjsonItem(key));
			       });
			       $.each($scope.raxis, function( index, value2 ) {
				          var key = "" + value +":"+value2 +"[1]";
				         // $scope.datasetstoshow.push(key);
				          $scope.legendvalues.push(getjsonItem(key));
				       });
			 });
		 	var lkeys = _.uniq(_.pluck($scope.legendvalues, "name"));
		   	   $scope.legendvalues =[];
		   	   $.each(lkeys, function( index, value ) {
		   		   $scope.legendvalues.push(getjsonItem(value));
				   });  
		   	if($scope.legendvalues.length > 0 ) {
		   	    $scope.isselectmsg=false;
		        $scope.selectmsg="";
		   	}
		   	else{
		   	   $scope.isselectmsg=true;
		       $scope.selectmsg= "No values for dataset and right or left axis. Please select an item from dataset(3rd select box)  and  right(2nd  select box) " +
				"or left(1nd  select box) axis"; 
		   	}
		      
	  }
	  function addlegendvalue(key){    	   
   	   $scope.legendvalues.push(getjsonItem(key));
   	   var lkeys = _.uniq(_.pluck($scope.legendvalues, "name"));
   	   $scope.legendvalues =[];
   	   $.each(lkeys, function( index, value ) {
   		   $scope.legendvalues.push(getjsonItem(value));
		   });  
      }
	  
	  function setDatasetstoshow(){
		  $scope.datasetstoshow = _.pluck($scope.legendvalues, "name");
	  }  
	 function printStats(){
//		  console.log ("chdata.selectedlegend => $scope.laxis length =>" + $scope.laxis.length);
//   	   console.log ("chdata.selectedlegend => $scope.raxis length =>" + $scope.raxis.length);
//   	   console.log ("chdata.selectedlegend => $scope.$scope.chdata.currselecteddatasett length =>" + $scope.chdata.currselecteddataset.length);     	  
//   	   console.log ("chdata.selectedlegend => $scope.datasetstoshow length =>" + $scope.datasetstoshow.length);
//   	   console.log ("chdata.selectedlegend => $scope.legendvalues length =>" + $scope.legendvalues.length);   	   
   	 
	 }
	 function findAndRemove(array, property, value) {
		 var inds =[];
		   $.each(array, function(index, result) {
		      if(result[property] == value   ) { 
		    	  inds.push(index);
		      }    
		   });
		   $.each(inds, function(index, result) { 
			         array.splice(result, 1); 
		   });
		}
	 function find (array, property, value) { 
		   $.each(array, function(index, result) {
		      if(result[property] == value) { 
		    	 return true;
		         // array.splice(index, 1);
		      }    
		   });
		   
	 }	
	 
	 $scope.processSelectedRaxis = function(msg){
		console.log(msg);
		if($rootScope.isSaveLegend){ 
		  $scope.raxis=[];
		}	        	 
		addAxis($scope.chdata.selectedraxis,0,$scope.raxis); 
	 }	 
	 $scope.processSelectedLaxis = function(msg){
	    console.log(msg);
	    if($rootScope.isSaveLegend){ 
		   $scope.laxis=[];
        }
	    console.log($scope.chdata.selectedlaxis[0].name);
		addAxis($scope.chdata.selectedlaxis,0,$scope.laxis); 
	 }
	 $scope.processSelectedLegend = function(msg){
		 console.log(msg);
			$scope.isselectmsg=false;
	 	 printStats();
	    	$scope.chdata.currselecteddataset=[];
	    	$scope.laxis =[];
	    	$scope.raxis =[];    
	    	$.each($scope.chdata.selectedlegend, function( index, value2 ) {
			     console.log ("chdata.selectedlegend => " + value2.name);		     
			     var axisvalue = value2.name.split("[")[0];
			     var axis = (axisvalue.split(":")[1]);
			     console.log (" chdata.selectedlegend axisvalue => "+ axisvalue + " axis => " + axis);
			     findAndRemove($scope.legendvalues, "name", value2.name);
	    	 });	  
			      
			     
	    	if($scope.legendvalues.length > 0 ){   
		       $.each($scope.legendvalues, function( index, value ) {
		    	 var dsitem = value.name.split(":")[0];
		    	 var str2 = value.name.split(":")[1];
		    	 var axisitem = str2.split("[")[0];
		    	 var lraxis = str2.split("[")[1];
		    	 
		    	 $scope.chdata.currselecteddataset.push(getjsonItem(dsitem));
		    	 if(value.name.indexOf("[0]") > -1)
			     {
			    	 
			    	$scope.laxis.push(axisitem);
			   	 }
			     else if(value.name.indexOf("[1]") > -1)
		    	 {
			    	 $scope.raxis.push(axisitem);
		    	 } 
		       });
	    	}  
	    	else {
//	    		$scope.chdata.selectedlaxis
//	    		$scope.chdata.selectedraxis
	    		$scope.isselectmsg=true;
			    $scope.selectmsg= "No values for dataset and right or left axis. Please select an item from dataset(3rd select box)  and  right(2nd  select box) " +
				"or left(1nd  select box) axis"; 
	             $('#seldsopt > option').removeAttr("selected");
	             $('#selrxopt > option').removeAttr("selected");
	             $('#sellxopt > option').removeAttr("selected");
	             $scope.chdata.selecteddataset=[];
	             $scope.chdata.selectedlaxis=[];
	             $scope.chdata.selectedraxis=[]
	         }	  	   
	    	setDatasetstoshow();
	    	printStats();
	    	refreshChart();
	 }
	 $scope.processSelectedDataset = function(msg){		 
		 console.log(msg);
	     if($rootScope.isSaveLegend){
	          $scope.chdata.currselecteddataset=[]; 
	          $scope.legendvalues =[];
	       }	      
	       $.each($scope.chdata.selecteddataset, function(index, result) {
	    	   $scope.chdata.currselecteddataset.push(result);   
	       });
	       $scope.chdata.currselecteddataset = _.uniq($scope.chdata.currselecteddataset);
	       $.each($scope.chdata.currselecteddataset, function(index, result) { 
	    	   $.each($scope.laxis, function( index, value2 ) {
	 			  var key = "" + result.name +":"+value2 +"[0]";
	 			 addlegendvalue(key);
	    	   });
	    	   $.each($scope.raxis, function( index, value3 ) {
		 			 var key2 = "" + result.name +":"+value3 +"[1]";
		 			 addlegendvalue(key2);
		       });
	       });
	       printStats();
	       setDatasetstoshow();
	       updatechartdata();
	       refreshChart();
		 
	 }
	  $scope.$watch('chdata.selectedcharttype', function(newValue, oldValue ) {
		  	if(newValue ==  oldValue )return;
		  	localStorage.setItem("selectedcharttype" , newValue);
		    console.log("localStorage.getItem.selectedcharttype => " + localStorage.getItem("selectedcharttype") );	 	     
		  	console.log(" sselected chart ttpe. ");
		       	$scope.stockchart.chart.type=newValue; 
		       	refreshChart( );
	  }); 
	  $scope.$watch('isTrend', function(newValue, oldValue ) {
	   	if(newValue ==  oldValue )return; 
	   	$rootScope.isTrend = newValue;
	   	localStorage.setItem("isTrend" , newValue);		      
	    console.log("localStorage.getItem.isTrend => " + localStorage.getItem("isTrend") );	 	     
		console.log(" is Trend. ");  
		refreshChart( );
	  });
	  $scope.$watch('isLegend', function(newValue, oldValue ) {
	   	if(newValue ==  oldValue )return; 
	 	localStorage.setItem("isLegend" , newValue);
	    console.log("localStorage.getItem.isLegend => " + localStorage.getItem("isLegend") );	
	    $rootScope.isLegend = newValue;
		console.log(" is Legend. "); 
		refreshChart( );
	  });
	  $scope.$watch('isSaveLegend', function(newValue, oldValue ) {
	   	if(newValue ==  oldValue )return; 
	 	localStorage.setItem("isSaveLegend" , newValue);
	    console.log("localStorage.getItem.isLegend => " + localStorage.getItem("isSaveLegend") );	
	    $rootScope.isSaveLegend = newValue;
		console.log(" is isSaveLegend. "); 
	  });
	  $scope.$watch('isBasic', function(newValue, oldValue ) {
	   	if(newValue ==  oldValue )return;		        
	    $rootScope.isLegend = newValue;
	    $rootScope.isTrend = newValue;
	 	localStorage.setItem("isBasic" , newValue);
	 	localStorage.setItem("isLegend" , newValue);
	 	localStorage.setItem("isTrend" , newValue);
	    console.log("localStorage.getItem.isBasic => " + localStorage.getItem("isBasic") );	 	     
	    basicChart(newValue); 
	    refreshChart( );
	  });
	  $scope.$watch('isMenu', function(newValue, oldValue ) {
		  	 if(newValue ==  oldValue  )return;  
		  	 localStorage.setItem("isMenu" , newValue);
		     console.log("localStorage.getItem.isMenu => " + localStorage.getItem("isMenu") );	
		         $rootScope.isMenu = newValue;
		         globalUtil.getChartHight(); 
		         refreshChart( );
	  });  
	  $scope.$watch('tableoptions', function(newValue, oldValue ) { 
		  if(newValue ==  oldValue  )return; 
		  globalUtil.getChartHight(); 
 		  refreshChart( );
	  });  
    } 
   };
 });
});