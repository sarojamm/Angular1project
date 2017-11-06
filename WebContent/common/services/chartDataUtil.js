'use strict'; 
define(['service','underscore','jquery'], function(services,_,$ ) { 
 services.service("chartDataService", function($resource, genericServices) { 
  var datasets =[];
 // var datasetkeys =[ "MMEPOOL","REGION", "MARKET" , "SITE","ENODEB","SGW"];  
 
  this.getNetworkelemts = function () {  
    return networkelemts;
  }
  this.getDatasets = function (  data ) {  
	  getDatasets( getDatasetElements(data)  );
	//  console.log("  getDatasets2  " + datasets);		
     return  datasets;
  }
  function getDatasetElements (data){
  		var commonvalues = genericServices.commonValues(    Object.keys (data[0]));
  		var dataset=[];
  		var isfirst = true;
		$.each(data, function( index, value ) {
			var str="";			
			$.each(commonvalues, function( index2, value2 ) {
				 if(str.length > 0 )
				    str = str +"-"+ value[value2] ;
				 else  str =  value[value2] ;
					// console.log(" value2 : "+ str);             	   	    			
		    }); 
			if(str.indexOf("*") < 0){
			   dataset.push(str); 
			} 
		});
		dataset = _.uniq(dataset)
	//	console.log(dataset);
	   	return dataset;
	} 
  this.getValuesForDataset = function (data, item){ 
	  var selectedds = item.split('-');		 
	  var list = genericServices.commonValues(Object.keys(data[0]));
	  var filterdataset = data;
	  for(var x in list){
		  var resultSet = $.grep(filterdataset, function (e) {
			 // console.log(  selectedds[x] +" === " +  e[list[x]]   );
			 // return ( selectedds.indexOf(e[list[x]]) > -1 );
			  return ( selectedds[x] === e[list[x]]   );
		  });
		  if(resultSet.length > 0 ) filterdataset = resultSet; 
 	  }
	  return filterdataset;
  }
//  this.getDatasetkeys = function ( obj, data ) {  
//    return datasetkeys;
//  }
  function getDatasets ( ds) {
	  //[{"name" :"Alaska-Alaska-008-ANCHORAGE_INTERNATIONAL"},
	  // {"name" :"Alaska-Alaska-008-ANCHORAGE_INTERNATIONAL"}]}
	  var name = 'name';
	  var currdataset = [];
	  datasets = []; 
	  for ( var y in ds) {
		     var jsonItem = {};
		     jsonItem[name] = ds[y];
		     currdataset.push(jsonItem);
		  }
	  datasets = _.uniq(currdataset); 
  }
 
 });
});