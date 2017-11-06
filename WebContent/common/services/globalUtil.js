'use strict';
 

define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("globalUtil", function( $rootScope,$http) {

	    
		  $rootScope.borderhights =15;
		  $rootScope.borderwidth =10;
        $http.get('resources/Test.properties').then(function (response) {
    	$rootScope.TestStringValue = response.data.TestString;
    	$rootScope.BooleanValue = response.data.BooleanValue;
    	$rootScope.title = response.data.title;
	    console.log('TestString is ', response.data.TestString);
	    console.log('BooleanValue is ', response.data.BooleanValue);        
	    console.log('$rootScope.TestStringValue is ',$rootScope.TestStringValue);
	    console.log('$rootScope.BooleanValue is ', $rootScope.BooleanValue);  
	    console.log('$rootScope.title is ', $rootScope.title); 
	  });
       	$rootScope.tbltxtopt = [
		                        { label: '8', value: 8 },
		                        { label: '9', value: 9 },
		                        { label: '10', value: 10 },
		                        { label: '11', value: 11 },
		                        { label: '12', value: 12 },
		                        { label: '13', value: 13 },
		                        { label: '14', value: 14 }];
		
		$rootScope.tooltipmsgs ={}
		$rootScope.tooltipmsgs  [ 'filter'] =  'Enter text to fFilter the data table rows ';
		$rootScope.tooltipmsgs  [ 'home'] =  [' H( top right corner with circle around) Toggle button to view and hide the header bar.',
			                                  'Show Options: To see the options for Chart view, Table view or some other options ',
		                                      'Sort: Click on the clolumn header',
		                                      'ColumnReorder:Click, hold left mouse on column hander drag right or left.',
		                                      'Hide/show Formula:  To see formula, hover on the KPI column(non-fixed columns) ',
		'Fixed Cloumns: Scroll bar forFrozen columns is in the Options bar. Fixed columns can be adjusted by using this. ',
		'Hide/Show columns: Right click opens a drop down with column names with the check box. check or uncheck the column header name to hide or view the column.',
		'Disable Save Legend: This option can be checked if User wants to NOT add KPIs to the aggregate view, and only show one at a time. In that case  The user should have to CTRL+ click a KPI to add more than one KPIs to the charting view.'];
		
		
		$rootScope.tooltipmsgs  [ 'pager'] =  'Click on the right side light bulb to set the number of rows to show on a page. Click on left side arrows to move next page, previous page,first page or last page.. ';
		$rootScope.tooltipmsgs  [ 'options'] =  'Select/unselect  to see table and chart options.';
		$rootScope.tooltipmsgs  [ 'download'] =  'Click to see links to download CSV, XLS or PDF files';
		$rootScope.tooltipmsgs  [ 'knownissuestitle'] =  'Click here to see known issues and workarounds.';
		$rootScope.errormsgs={};
		$rootScope.errormsgs['1'] ="No Data to Display.";
		 
		this.getGridHight = function(winid){	
			console.log(winid);
			console.log($( "#rptstatswin" ).height());
		 	 var charth = $rootScope.borderhights;
		 	 var hight = ($(window).height() - ($( "#head" ).height()) +400);			 
			
		   	 $rootScope.gridheight= $(window).height() - ($( "#head" ).height() +75);	 
		 	 $rootScope.gridwidth= ($( "#rptinforight" ).width() -charth);
		 	 
			 if($rootScope.isMenu ){		        	 
		       $rootScope.gridheight-=  ($( "#rptstatswin" ).height()+$( "#rptinfonav" ).height() );	
		       hight -=($( "#rptstatswin" ).height());
	         }
//		 
//			 if($rootScope.chartopt && $( window ).width() > 800 && $( window ).width() < 1200  &&   $( window ).height() > 750){	
//				 	 charth +=  $( "#chartleftoption" ).height();				 
//	         }
 
			 if( $rootScope.gridheight < 250 )  $rootScope.gridheight=350;
			// $(winid ).css( 'height' ,  hight+'px' ); 
			// $("#rptinfoleft").css( 'height' ,  hight +'px' );  
			 //$("#rptinforight").css( 'height' ,  hight +'px' ); 
		}
		this.getChartHight = function(){		
			 $rootScope.chartheight= $( "#chartcontainer" ).height() - ($rootScope.borderhights +20);	
			// $rootScope.chartwidth = $( "#chartcontainer" ).width()  - ($rootScope.borderwidth +20); 
			 
			 $rootScope.gridheight= $(window).height() - ($( "#head" ).height() +75);	 
		 	 $rootScope.gridwidth= ($( window ).width() - ($rootScope.borderwidth +20));
			
		 	 if($rootScope.isMenu ){		        	 
		 		 $rootScope.chartheight= $( window ).height() - ($rootScope.borderhights +$( "#ltewrapper" ).height());	
		 		 $rootScope.gridheight= $(window).height() - ($( "#head" ).height() +75);					 	
	         } 
			// console.log("rootScope.chartwidth => " + $rootScope.chartwidth);
			 console.log("rootScope.chartheight => " + $rootScope.chartheight); 
			 
			 console.log("rootScope.gridheight => " + $rootScope.gridheight);
			 console.log("rootScope.gridwidth => " + $rootScope.gridwidth); 
		}
	 	this.setLocalStorage = function(){
			if (typeof(Storage) != "undefined") { 				
			  	$rootScope.isBasic  = getValue( 'isBasic');/*this used to  basic chart or advance chart advance chart includes trend line, legend bar, date filtes and scaling on the chart. based on the user selection basic chart or stock chart will be created */
 				$rootScope.isLegend = getValue('isLegend');
 				$rootScope.isTrend  = getValue('isTrend') ;
 		 		$rootScope.isFormula = getValue( 'isFormula');
 				$rootScope.isMenu = getValue('isMenu');
 				$rootScope.isSaveLegend = getValue('isSaveLegend');
 				$rootScope.tableoptions =getValue('tableoptions'); 	
 				$rootScope.chartopt = true;
 				$rootScope.tactive = (localStorage.getItem('tactive'))? localStorage.getItem('tactive'):  'active';
 				$rootScope.cactive = (localStorage.getItem('cactive'))? localStorage.getItem('cactive'):  '';
 		        $rootScope.selectedPageTxtSize = (localStorage.getItem('selectedPageTxtSize') === null )?  $rootScope.tbltxtopt[3].value : localStorage.getItem('selectedPageTxtSize'); 
  		        console.log( "  $rootScope.selectedPageTxtSize => " + $rootScope.selectedPageTxtSize   );
  		        console.log( "  $rootScope.tableoptions => " + $rootScope.tableoptions   );
  		        $("body").css("font-size", $rootScope.selectedPageTxtSize + "px");
  		         setDivHeights(); 
			} else { 		 		 
 				alert("Sorry, your browser does not support Web Storage...");
 			}
		}
	 	function setDivHeights(){
	 		  $rootScope.optheight= ( $( "#head" ).height() + (($rootScope.isMenu === 'true') ? $( "#ltewrapper" ).height() +10 : 10));	
		      $rootScope.chartheight= $( window ).height() - $rootScope.optheight;	
//		      $rootScope.headhight = $( "#head" ).height();
		       $rootScope.headhight = 65;
	          $rootScope.optionhight = $( "#ltewrapper" ).height();
	 	}
	 	function getValue( id ){
	 		 return ((localStorage.getItem(id) === "true")? true: false);
	 	}
	 	this.getLocalStorageValue  = function(id){
	 		return getValue( id );	 		
	 	}
	 	 
  }) ;
});