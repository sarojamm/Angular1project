'use strict';
 

define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("toolTipServices", function(  ) { 
		var msg ="";
		var msg2 ="";
		var ddmsg ='';
		this.getMsg = function( ) {
			return msg;
		}
		this.setDdmsg = function( msg1 ) {
			ddmsg = msg1;
			$('div.ddmsg2').text( ddmsg);
		}
		this.updateMsg2 = function( msg1 ) {
			msg = msg1;
		}
		this.updateMsg = function( value, header, rowdata) {
			   msg ="Double-click to";
			   var str ='';
    		 //.title = "node data " + node.innerHTML  + "header data " + title.textContent ;
    		 //console.log( "node data " + value  + "header data " + header );
     	  	 if(header  =="DAY"){
    			 str ="DrillType=trendhour" ;
    			 msg += " see all 24 hour on " + value; 
    		 }
    		 else if( header  == "HR"){
    			 str ="DrillType=trenddayhour" ;
    			 msg += " see a 7 day trend for hour " + value;
    		 }
             else if( header  =="SITE" ||  header  =="MARKET"
            	  ||  header  =="REGION" ||  header  =="ENODEB"){
            	str ="DrillType=drilldown"  ;
            	msg += " drill below " +header+ " "  +  value + " hour "
            	    + rowdata["HR"];
    		 }
             else msg ="";
//             else{
//            	 str ="DrillType=drilldown" ;
//             	msg += " drill below " +header  +  value + " hour "
//             	    + rowdata["HR"];
//             }
     	  	 msg2 = msg;
			  return str;
		}
		function changeTooltipPosition(event) {
			 
     	  var tooltipX = event.pageX - 8;
     	  var tooltipY = event.pageY + 8;
     	  var width = 400;
//     	  console.log("tooltipX" +  tooltipX + "tooltipY"+ tooltipY);
//     	  console.log("(window).width()" + $(window).width());
     	  if((tooltipX + width) > $(window).width())
     		  tooltipX -= width; 
     	  $('div.ddmsg').css({top: tooltipY, left: tooltipX,width: width+"px" }); 
     	};      
     	this.showTooltip = function(event) {
     	  $('div.ddmsg').remove();
     	  $('<div class="ddmsg">I\' am tooltips! tooltips! tooltips! :)</div>')
                 .appendTo('body');
     	 // console.log("showTooltip"  );
     	  $('div.ddmsg').text( msg);
     	 $(".ddmsg2").css('background','#E7E7E7');    
     	  $('div.ddmsg2').text( msg2);
     	  
     	  changeTooltipPosition(event);
     	};      
     	this.hideTooltip = function() {
     		//console.log("hide Tooltip"  );
     		$('div.ddmsg2').text( ddmsg);
     		$(".ddmsg2").css('background','');;
     		msg2 = ddmsg;
     	    $('div.ddmsg').remove();
     	};
     	
     	
     	
     	
  }) ;
});