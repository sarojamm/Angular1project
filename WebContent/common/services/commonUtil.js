'use strict';
 

define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("genericServices", function(sessionService, $rootScope, $http,$location,$window, $resource,fileUtilService) {
	 	var elptheader;
		var elptData;	
		var datasets =[];
		var baseUrl='';
		var absUrl='';
		var jsonpath="/reports/elte/c0ammsa/json/";
 
	  	var netelements = [];
	  	var ddelements = [ ];
	  	var exceptaxis = [];
	  	var exceptcols = null ;
        var reportstats = null ;
	  	var toprunningrepts =null ;
	  	var rptInstancedata =  null;
		var userRptData =  null;
		var appid;
		var appname;
		$rootScope.isjson=true;
		$rootScope.titles={};
		$rootScope.titles  [ 'elte'] =  'Ericsson';
		$rootScope.titles  [ 'alte'] =  'Alcatel';
		$rootScope.titles  [ 'ncws'] =  'New Chicago Web Site';
		$rootScope.titles  [ 'npt']  =  'Nortel';
		$rootScope.titles  [ 'mpt']  =  'Motorola'; 
		$rootScope.titles  [ 'clpt'] =  'CLPT';
		$rootScope.titles  [ 'ELPT']  =  'Ericsson';
		
		$rootScope.normalize={};
		$rootScope.normalize  [ 'ELPT']  =  'elte';

		this.getUserRptData = function(){
			if(userRptData == null){
				if($rootScope.isjson){
					 userRptData = retrieveData(jsonpath +"userReports.json"  );		
				}
				else userRptData = retrieveData("/lteservice/getReportsInfoByUser/" + sessionService.getLoginUid ()  );				 
			}				
		   	return userRptData;
		}
		this.resetStats =function(){
	  		reportstats=null;
	  		toprunningrepts = null;
	  		rptInstancedata = null;
	  		userRptData=null;
	  	}
		this.getRptInstancedata = function(time){
			if(rptInstancedata == null){
				if($rootScope.isjson){
					rptInstancedata = retrieveData(jsonpath +"reportInstancedata.json"  );		
				}
				else rptInstancedata = retrieveData("/lteservice/getReportInstanceByUserName/" +sessionService.getLoginUid ()+"/"+time  );				 
			}				
		   	return rptInstancedata;
		}		 
	  	
	  	this.getReportstats = function(time){
			if(reportstats  == null){
				if($rootScope.isjson){
					reportstats = retrieveData(jsonpath +"reportstats.json"  );		
				}
				else reportstats = retrieveData("/lteservice/getReportStatsByUser/" +sessionService.getLoginUid ()+"/"+time+"/3");				 
			}				
		   	return reportstats;
		}
		 
	  	this.getToprunningrepts = function(time){
			if(toprunningrepts == null){
				if($rootScope.isjson){
					toprunningrepts = retrieveData(jsonpath +"toprunningrepts.json"  );		
				}
				else toprunningrepts = retrieveData("/lteservice/getReportStatsTopRunning/" +sessionService.getLoginUid () +"/"+time  );				 
			}				
		   	return toprunningrepts;
		}	  	 
	  	this.getExceptcols = function(){
			if(exceptcols.length == 0)
				setElements();
		   	return exceptcols;
		}
	  	
		this.getNetelements = function(){
			if(netelements.length == 0)
				setElements();
		   	return netelements;
		}
		this.getDdelements = function( ){
			if(ddelements.length == 0)
				setElements();
		   	return ddelements;
		} 
	    function commonValues2(arr1, arr2){ 
		   	return _.intersection(arr1, arr2);
		} 
	    this.commonValues = function (  arr){		   
	    	var commonvalues =[];
		    $.each(arr, function( index, value ) {
		    	if(netelements.indexOf(value) > -1)
		    		commonvalues.push(value);    	    			
    		});
		    return commonvalues;
		} 
	  
	  	function getLocalDataset (arr1, arr2){
		   	return _.intersection(arr1, arr2);
		}  
	  	function setElements  (){
	   		var resourcename = baseUrl+ "/lteservice/getUIElements/<src>";
	   		if($rootScope.isjson){
	   			resourcename = jsonpath +"<src>.json";
	   		}
	   		resourcename = jsonpath +"<src>.json";
	   		var data =  retrieveData(resourcename.replace("<src>","dd"));
	   		ddelements = _.uniq(_.pluck(data, "itemName"));
	   		
	   		data =  retrieveData(resourcename.replace("<src>","ne"));
	   		netelements = _.uniq(_.pluck(data, "itemName"));
	   		
	   		data =  retrieveData(resourcename.replace("<src>","ex"));
	   		exceptaxis = _.uniq(_.pluck(data, "itemName"));
	   		
	   		data =  retrieveData(resourcename.replace("<src>","colex"));
	   		exceptcols = _.uniq(_.pluck(data, "itemName"));
	   	}
		//var chartTypes = ['line','scatter','bar' ,'column', 'pie', 'multchart','stock2'];
		var chartTypes = ['line','scatter','bar' ,'column'];
		this.getChartTypes = function(){
		   	return chartTypes;
		}
		var multichartTypes = ['line','bar' ,'column' ];
	 	this.getMultichartTypes = function(){
		   	return multichartTypes;
		} 
	    this.getJsonFromCsv= function(resourcename){ 
			elptData = fileUtilService.csvJSON(fileUtilService.readFile( resourcename));
			elptheader  = fileUtilService.getHeader();
		   	return elptData;
	    } 
		this.getElptheader= function(resourcename){ 
			return elptheader;
	    } 
		this.getBaseUrl= function(){ 
			baseUrl = $location.protocol()+ "://"+ $location.host()+":"+$location.port();
			return baseUrl;
	    } 
		 
		this.getLoginUrl= function(){ 
			var loginUrl = $location.protocol()+ "://"+ $location.host()+":"+$location.port()+"/"+$rootScope.appid+"/login.htm";
			return loginUrl;
	    } 
		this.getAbsUrl= function(){ 
			absUrl = $location.absUrl();
			return absUrl;
	    } 
		function retrieveData(resourcename){ 
			var ldata; 
		  	var path = baseUrl+resourcename;  
			$.ajax({
				  url: path,
				  async: false,
				  data: ldata,
				  success: function(data) {
					  ldata = data; 
//					  elptData = data.reportdata;
//					  datasets = data.dataset; 
					  return ldata;
				  }
				});
 		   	return ldata;
	    }  
		this.retrieveElptData = function(resourcename){
			elptData =  retrieveData(resourcename);
		   	return elptData;
	    } 
		this.getElptData = function(){
			return elptData;
	    } 
		this.redirectSIte = function(ddbaseurl){
			 $window.location.href = ddbaseurl; 
	    }  
	 	  
	    this.getGolbolchart = function(){
	    	return golbolchart;
	    }                                                                                                                                                                                                         
	    this.getValuesForprop = function(obj , prop){
	    	return _.uniq(_.pluck(obj, prop)); 
	    }  
	    var numprops = [];
	    var textprops = [];
	    this.getNumprops= function (){
	    	return numprops;
	    }
	    this.getTextprops = function ( ) {  	    	            
		       return textprops;
		   } 
	    this.getProps1 = function (obj) {   
        	var name ='name';
        	while(numprops.length > 0 )  numprops.pop();
        	while(textprops.length > 0 )  textprops.pop(); 
        	for (var x in obj){
          	    if (obj.hasOwnProperty(x)){
          	    //  if(exceptaxis.indexOf(x) > -1){
          	    	if( x === 'DAY' || x === 'HR' ||  x === 'time' || x === 'id' || x === 'MI' || x === 'MONTH' || x === 'Date'){ 
          	    		//console.log(x + "  is DAY or HR " );    
    				} 
          	    	else if(typeof obj[x]=== 'number'){ 
          	    		var jsonItem = {};
              	        jsonItem[name]=  x;
                  	    numprops.push(jsonItem);;
    				} 
          	    	else if (typeof obj[x]=== 'string'){
          	    		var jsonItem = {};
              	        jsonItem[name]=  x;   
              	    	textprops.push(jsonItem);
          	        }   
          	    }
        	}
      	}
	    this.getHeadersArr = function (obj) {  
	    	var headers=[];
	    	for ( var property in obj )  headers.push(property);            
      	  return headers;
      	}
	    function dateformatter(row, cell, value, columnDef, dataContext) {
	        var dateval = (isNaN(value)) ? value : new Date(value).toString();
	      	return getcolor(""+ dataContext.reportId,  dateval); 
	    }
	    function rowcolor(row, cell, value, columnDef, dataContext) {
	   	  	return  getcolor(""+ dataContext.reportId,value);
	    }
	    function locationlink(row, cell, value, columnDef, dataContext) {
	    	var val = 
	    	   " <span ><button type='button' class='btn btn-xs center view"+ dataContext.status+ "' aria-label='Top Align'>  <span class='glyphicon glyphicon-align-middle' aria-hidden='true'>View</span></button></span>";
	    	return  getcolor(""+ dataContext.reportId,val);
	   	 //   return "<span class='highlight'> View </span>";;
	    }
	    function getcolor(rptid,value){	    	
	    	if (rptid  === $rootScope.reportId)
            {  
	    		  return "<span class='highlight'>" + value + "</span>";
            }    
	    	else  return "" + value + "";
	    }
	    this.getSlickHeaders = function (obj,width,rptId) {      
	    	var jsonData = [];
	    	if (exceptcols == null )setElements();
		   	 
          	for (var x in obj)
          	   if (obj.hasOwnProperty(x)){          	    	     
          	    	var jsonItem = {};
              	   var datestr = x.toLowerCase();               
              	    if( datestr.indexOf("date") > -1)	{ 
              	    	jsonItem["formatter"] = dateformatter;
              	    } 
              	    else if( datestr.indexOf("location") > -1)	{ 
            	    	jsonItem["formatter"] = locationlink;
            	   }  
              	   else  jsonItem["formatter"] =  rowcolor;
              	    
              	  if(exceptcols.indexOf(datestr) < 0 )		
              	  //  if( datestr != "report" && datestr != "time" &&  datestr  != "eldist" &&  datestr  != "pid" &&  datestr  != "pkid" &&  datestr  != "subid" &&  datestr  != "sortdirection")
              	    {            	   
            	    	jsonItem["id"] = x  ;
                   	    var x1 = x.replace(/_/g, " "); 
                   	    jsonItem["name"] = x1.replace(/:/g, ": ");
                   	    jsonItem["sortable"] = "true"  ;
                   	    jsonItem["field"] = x;
                   	    if( width > 0 )
                   	        jsonItem["width"] =  width;    
                   	    jsonItem["resizable"] =  true; 
                   	    jsonItem["rerenderOnResize"] =  true;  
                   	    jsonItem["syncColumnCellResize"] =  true;    
                   	   
                   	   	jsonData.push(jsonItem);
            	    }
              	  
          	   } 
      	    return jsonData;
      	} 
	    this.getHeaders = function (obj) {     
	    	//Object { sName="DAY", sTitle="DAY", bSortable="true"}
	    	var i =0;
        	var jsonData = [];
        	for (var x in obj)
          	   if (obj.hasOwnProperty(x)){          	    	     
          	    	var jsonItem = {};
              	    jsonItem["sName"] = x  ;
              	   var x1 = x.replace(/_/g, " "); 
              	    jsonItem["sTitle"] = x1.replace(/:/g, ": ");
              	    jsonItem["bSortable"] = "true"  ;
              	    jsonItem["sClass"] = "my_class";
              	    jsonItem["sWidth"] =  "10px"; 
              	    jsonItem["sContentPadding"] =  "mm"; 
              	    i++;
              	//    jsonItem["sClass"] = "tdclass"  ; 
              	   	jsonData.push(jsonItem);
          	   }        		
      	    return jsonData;
      	}
	    this.getHeaderStr = function (obj) {  
	    	var headerStr='';
	    	for ( var property in obj ) 
	    		headerStr += property+",";            
      	  return headerStr;
      	}
	  
  
	 
	 
  }) ;
});