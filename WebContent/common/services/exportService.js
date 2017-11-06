'use strict';
 

define(['service','underscore','jquery','bootstrap', 'jqueryui'], function(services,_,$ ,bootstrap,jqueryui) {	
	services.service("exportService", function(genericServices ) {     
	  this.exportJsontoCSV =  function (filename,type, data){
			var csv = JSON2CSV( data); 
			var filetype = "";
			var fileid ="";
			var csvData ="";
			console.log(csv);
			filename += type;
			if(type === 'csv'){
				   filetype = 'data:application/csv;charset=utf-8,';
				   fileid = "downloadcsv";
			    }
			   else if(type === 'xls'){			  
				   filetype = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8,';
				   fileid = "downloadxls";
			   }
			   else 	{
				   var data12 = $.base64Encode('something');   
				   filetype = 'data:application/x-pdf;charset=base64,'
				   var txt=   $.base64().encode(csv); 
				   csv = txt;
				   fileid = "downloadpdf";
			   }	
			    filename = filename.replace(".json",""); 
		   $('<a></a>')
		    .attr('id',fileid)
		    //.attr('href','data:text/csv;charset=utf8,' + encodeURIComponent(csv))
		    .attr('href',filetype + encodeURIComponent(csv))
		    .attr('download',filename)
		    .appendTo('body');
	        var fid = "#"+fileid;
		    $(fid).ready(function() {
		       $(fid).get(0).click();
		    });
		 
	    }
		function JSON2CSV(objArray) {
			    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
			    var head =  genericServices.getHeaderStr(objArray[0]);
			    console.log(head);
			    var str =  head +"\n"; 
			    for (var i = 0; i < array.length; i++) {
			        var line = '';
			        for (var index in array[i]) {
			        	if(typeof array[i][index] === 'number'){
		   	        	    line += array[i][index] + ',';
					    } 
		     	    	else{    
		     	    		line += '"'+array[i][index] + '",';
		     	        }  
		            } 
			        str += line + '\r\n';
			        //console.log(line);
			    }
			    return str; 
	    }
	 
	 
  }) ;
});