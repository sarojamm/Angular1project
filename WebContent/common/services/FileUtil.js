'use strict';
 
define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("fileUtilService", function($resource) {  
		var headers=[];
		this.getHeader = function(){
			return headers;
		}
		this.csvJSON= function(csv){ 		 
			  var lines=csv.split("\n");			 
			  var result = [];			 
			  headers=lines[0].split(",");			 
			  for(var i=1;i<lines.length;i++){			 
				  var obj = {};
				  var currentline=lines[i].split(",");			 
				  for(var j=0;j<headers.length;j++){
					  obj[headers[j]] = currentline[j];
				  }			 
				  result.push(obj);			 
			  }				  
			  return JSON.stringify(result); //JSON
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
		$(".export").on('click', function (event) {
	        exportJsontoCSV.apply(this, [ $scope.filename,'csv']); 
	    });
		$(".pdfexport").on('click', function (event) {
	        exportJsontoCSV.apply(this, [ $scope.filename,'pdf']); 
	    });
		$(".xlsexport").on('click', function (event) {
	        exportJsontoCSV.apply(this, [ $scope.filename,'xls']); 
	   }); 
	   function exportJsontoCSV(filename,type){
		   var csv = JSON2CSV($scope.data); 
		   var filetype = "";
		   var csvData ="";
		   console.log(csv);
		   filename += type;
		   if(type === 'csv'){
			   filetype = 'data:application/csv;charset=utf-8,'
		   }
		   else if(type === 'xls'){
			   filetype = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8,'
		   }
		   else 	{
			   filetype = 'data:application/pdf;charset=base64,'
			   var txt=   $.base64().decode(csv);
			   console.log(txt);
		   }	
		   console.log("$scope data in exportJsontoCSV " + $scope.data.length +" filename is :"+  filename);
		   var csvData =  filetype + encodeURIComponent(csv);
		   $(this).attr({
		   'download': filename,
		       'href': csvData,
		       'target': '_blank'
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
		        console.log(line);
		    }
		    return str; 
		}
	});
});