'use strict';
 
define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("timeUtil", function($resource) {  
		var headers=[];
		this.getHeader = function(){
			return headers;
		}
		
		this.getTotalTime =  function (endtime, starttime){	    	
		    	var hourDiff = endtime - starttime; //in ms
		    	var secDiff = hourDiff / 1000; //in s
		    	var minDiff = hourDiff / 60 / 1000; //in minutes
		    	var hDiff = hourDiff / 3600 / 1000; //in hours
		    	var humanReadable = {};
		    	humanReadable.hours = Math.floor(hDiff);
		    	humanReadable.minutes =  Math.floor( minDiff - 60 * humanReadable.hours);
		    	humanReadable.seconds  = Math.floor( secDiff - 60 * humanReadable.minutes);;    
		       var timestr = "" + hourDiff+ " ms | " +   humanReadable.hours  + " h : " +   humanReadable.minutes    +" m : " +humanReadable.seconds + "sec";
		       return timestr;
		  }
		 
		this.readFile = function(file){ 
			file = "/ltewebver2/downloads/eNodeB_ALL_10132014142900.csv";
			var rawFile = new XMLHttpRequest();
			rawFile.open("GET", file, true);
			rawFile.onreadystatechange = function ()
			{
			    if(rawFile.readyState === 4)
			    {
			        if(rawFile.status === 200 || rawFile.status == 0)
			        {
			            var allText = rawFile.responseText; 
			            console.log("" + file +" => " +allText);
			            return allText;
			        }
			    }
			}
			rawFile.send(null);
			 
		}
		 
	    
	});
});