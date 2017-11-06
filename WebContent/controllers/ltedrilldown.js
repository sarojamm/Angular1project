//$Log$

var browser = "";
var cursorthing = "";
if ( document.addEventListener ){
	browser='Mozilla';
	cursorthing="crosshair";

} else {
	browser='IE';
	cursorthing="hand";
}

// global variables;  
var ddurl = '/loading.html';

var headers = new Array();
var isValidForDrillDown = false;

// array of possible network element identifiers.
// 3/16/2011 wwn.  Add PGWs.
var netelements = new Array();
netelements['MMEPOOL']='MMEPOOL';
netelements['REGION']='REGION';
netelements['MARKET']='MARKET';
netelements['ENODEB']='ENODEB';
netelements['ENODEB_GROUP']='ENODEB_GROUP';
netelements['EUTRANCELL']='EUTRANCELL';
netelements['EUTRANCELLRELATION']='EUTRANCELLRELATION';
netelements['MME']='MME';
netelements['SLOTID']='SLOTID';
netelements['PORTID']='PORTID';
netelements['INTERFACENAME']='INTERFACENAME';
netelements['MAGID']='MAGID';
netelements['SGW']='SGW';
netelements['PGW']='PGW';
netelements['PORT']='PORT';
netelements['NETWORK']='NETWORK';
netelements['BGP_PEER_IP']='BGP_PEER_IP';

//target location (usually current window or a pop up)
var mywindow=self.document;

/*Used to show/hide an hourglass image while waiting.. */
function ShowWait() {
    document.all.divWait.style.display = "block";
}
function HideWait() {
    document.all.divWait.style.display = "none";
}  


// Executed after page is loaded via script on page.
function postload() {
    HideWait();
    // must determine if content is open in frame or in its own window; 
    // we can't access DOM elements properly unless we know
    if ( window.frames[2] ) {
        mywindow= window.frames[2].document;
    }

    // Get all of the column headers.  Assign bgcolor to date, hr, min, and element headers.
    var header_els = mywindow.getElementsByTagName('TH');
    var fldname;
    for(var i=0;i<header_els.length;i++) { 
        fldname = header_els[i].firstChild.nodeValue;   
        if ( (fldname in netelements) || fldname == "DAY" || fldname == "HR" || fldname == "MI" 
            || fldname == "SITE" || fldname == "MARKET_DESC" || fldname == "CARRIER"
               || fldname == "EUTRANCELLRELATION_DESC" || fldname == "SLOT" ) 
        {
            if ( fldname == "DAY" || fldname == "HR" || fldname == "MI" ) {
                header_els[i].bgColor = "white";
            }else {
                header_els[i].bgColor = "lightblue";
            }      
        }else {
            header_els[i].bgColor = "palegreen";
        }	
        headers.push(header_els[i].firstChild.nodeValue);	  
        //header_els[i].href='/NCWS_calcs.html#' + header_els[i].firstChild.nodeValue.replace(/ /g,'');
    }

    header_els = undefined;    

    return;

}


function mydblclick(e) {
	if ( browser!='IE' ) {
		theobject=e.target;
	} else {
		//theobject=event.srcElement;
	}

	//If dblclicking on drill down element then submit form back to controller.
	if( isValidForDrillDown ) {
	    ShowWait();  //show hourglass 
		document.Form1.submit();
	}
	//else if ( theobject.parentNode.tagName == 'TR' && 
	          	//theobject.href && theobject.tagName == 'TH' ) {
			// new window
			//calcs=window.open(theobject.href,'Calcs');
			//calcs.focus();
	//}
	return;
}


function mouseover(e) {
	if ( browser!='IE' ) {
		theobject=e.target;
	} else {
		theobject=event.srcElement;
	}

	set_message( 'Move cursor over table for Drill Down options' );

	if( theobject.parentNode.tagName == 'TR' && 
		theobject.firstChild.nodeValue && theobject.tagName == 'TD' ) 
        {
            var thekids=theobject.parentNode.childNodes;
            //figure out which child this is. 
            for (var i=0;i<thekids.length;i++) {
                if ( thekids[i] == theobject && headers[i] != 'Latitude' && headers[i] != 'Longitude' &&
                            theobject.firstChild.nodeValue != '*' ) 
                {				
                    CheckForDrillDown(thekids, theobject.firstChild.nodeValue, headers[i]);
                }
            }
	}
	else if ( theobject.parentNode.tagName == 'TR' && 
		theobject.href && theobject.tagName == 'TH') 
    {
            //theobject.style.cursor=cursorthing;
            //set_message( 'Double-click for Calculation/Peg Mapping - '+ theobject.firstChild.nodeValue );
	}

	return;
}


// logic to determine what the drill down query will be is in here.
function CheckForDrillDown(rowobjects, cellvalue, fieldname) {
	
    var hr = "";
    var this_message;
    var this_hr_message = "";
    isValidForDrillDown = false;
	
    //Get and save day.
    var this_date = rowobjects[0].firstChild.nodeValue;
    mywindow.getElementById("Day").value = this_date;  

    //Get and save hour if present.	
    if(headers[1] == 'HR' ){
        hr = rowobjects[1].firstChild.nodeValue;
        this_hr_message = " Hour " + hr;
        mywindow.getElementById("Hr").value = hr;    
    }
    
    //Harvest key fields for form submit.
    for (var i=0;i<headers.length;i++) {
        if ( headers[i] == 'MMEPOOL' ) {				
            mywindow.getElementById('MmePool').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'MME' ) {				
            mywindow.getElementById('Mme').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'SLOTID' ) {				
            mywindow.getElementById('SlotId').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'NETWORK' ) {				
            mywindow.getElementById('Network').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'SGW' ) {				
            mywindow.getElementById('Sgw').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'PGW' ) {				
            mywindow.getElementById('Pgw').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'REGION' ) {				
            mywindow.getElementById('Region').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'MARKET' ) {				
            mywindow.getElementById('Market').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'ENODEB_GROUP' ) {				
            mywindow.getElementById('EnodebGroup').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'ENODEB' ) {				
            mywindow.getElementById('Enodeb').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'EUTRANCELL' ) {				
            mywindow.getElementById('Eutrancell').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'EUTRANCELLRELATION' ) {		
            mywindow.getElementById('EutrancellRelation').value = rowobjects[i].firstChild.nodeValue;
        }
        if ( headers[i] == 'SITE' ) {		
            mywindow.getElementById('LowerEnodeB').value = rowobjects[i].firstChild.nodeValue;
        }
        // FA 09/22/2013 MarketCarrier and RegionCarrier
        if ( headers[i] == 'CARRIER' ) {		
            mywindow.getElementById('Carrier').value = rowobjects[i].firstChild.nodeValue;
        }
        // FA 09/22/2013 MarketCarrier and RegionCarrier END
    }
	
    // FA 8/19/2013 - Check the SiteAggregation flag
    var siteAggFlag = mywindow.getElementById("SiteAggFlag").value;
    
    //If field clicked is a network element or day/hr then set things up to support a submit of the form. 
    //If field clicked is already at lowest report level then do nothing.
    //If field clicked is not a network element or time, then sort by this field.  
    if ( fieldname in netelements ) {
            
    	//FA 09/22/13 MarketCarrier and RegionCarrier
        var rL = mywindow.getElementById("ReportLevel").value;
    	var lRL = mywindow.getElementById("LowestReportLevel").value;
    	if ( (rL == "REGION_CARRIER") || (rL == "MARKET_CARRIER") || (rL == "ENODEB_CARRIER") ||
    			(rL == "EUTRANCELL_CARRIER") ) {
	    	rL = rL.replace("_CARRIER","");
	    	lRL = lRL.replace("_CARRIER","");
    	}
    	//FA 09/22/13 MarketCarrier and RegionCarrier END
    	
        if (mywindow.getElementById("ReportLevel").value == fieldname && 
            mywindow.getElementById("LowestReportLevel").value != fieldname &&
            mywindow.getElementById("LowestReportLevel").value != "n/a" ) {
                set_message( fieldname + ' ' + cellvalue + ': Double-click to drill below ' 
                                  + fieldname + ' ' + cellvalue + this_hr_message );
                mywindow.getElementById("SelectedElement").value = cellvalue;
                mywindow.getElementById("DrillType").value = "drilldown";
                mywindow.getElementById('SortField').value = "";
                isValidForDrillDown = true;
                
        //If MMEPOOL and not currently an hourly report then allow double click on
        //MMEPOOL to produce a 7 day trend.
        } else if( fieldname == 'MMEPOOL' &&  hr == '' ) {
            // show 7 day trend for this hour.
            set_message( 'Double-click to see a 7 day trend ending on ' + this_date );		
            mywindow.getElementById("DrillType").value = "trendday"; 
            mywindow.getElementById('SortField').value = "";
            isValidForDrillDown = true;
        }  
        // FA 09/22/2013 MarketCarrier and RegionCarrier
        // FA 09/22/2013 Add handling of composite reports
        else if (rL == fieldname && lRL != fieldname && lRL != "n/a") {
    		set_message( fieldname + ' ' + cellvalue + ': Double-click to drill below ' 
                + fieldname + ' ' + cellvalue + this_hr_message );
    		mywindow.getElementById("SelectedElement").value = cellvalue;
    		mywindow.getElementById("DrillType").value = "drilldown";
    		mywindow.getElementById('SortField').value = "";
    		isValidForDrillDown = true;        	
        }   
        // FA 09/22/2013 MarketCarrier and RegionCarrier END
    } else if( fieldname == 'DAY' ) {
        // show 24 hour hourly totals for this date.
        set_message( 'Double-click to see all 24 hours on ' + this_date );		
        mywindow.getElementById("DrillType").value = "trendhour";
        mywindow.getElementById('SortField').value = "";
        isValidForDrillDown = true;
    } else if( fieldname == 'HR' ) {
        // show 7 day trend for this hour.
        set_message( 'Double-click to see a 7 day trend for hour ' + hr );		
        mywindow.getElementById("DrillType").value = "trenddayhour"; 
        mywindow.getElementById('SortField').value = "";
        isValidForDrillDown = true;
    } else if (fieldname == 'SITE' && mywindow.getElementById("ReportLevel").value == "SITE" 
    	&& siteAggFlag == "true") {
    	set_message( 'Double-click to drill down to EnodeBs at - ' + fieldname + ': ' + cellvalue );
    	mywindow.getElementById("LowerEnodeB").value = cellvalue;
    	mywindow.getElementById("DrillType").value = "drilldown";
    	isValidForDrillDown = true;    	
    } 
    else{
        // sort if nothing else to do
        //set_message('Double-click to sort on ' + fieldname );
        mywindow.getElementById('SortField').value = fieldname;		
        mywindow.getElementById("DrillType").value = "sort";
    }    
    //7/21/2009 wwn.  If cursor position allows a drill down then show the hand or xhairs cursor.
    if ( isValidForDrillDown ) {
        theobject.style.cursor=cursorthing;
    }
    return;
}

// change messages in both status and tooltip area
function set_message(mtext) {
	try {
		parent.window.status = mtext;
	    //mywindow.getElementById('tooltip').firstChild.nodeValue = mtext;
	    mywindow.getElementById('tooltip').innerHTML = mtext;
	}
	catch(err){;}
	return;
}

/*Open a popup window. */
function OpenCenteredWindow(url, name, width, height, scrollbars) {
    var myWindow; 
    var left = parseInt((screen.availWidth/2) - (width/2));
    var top = parseInt((screen.availHeight/2) - (height/2))/2;
    var windowFeatures;
    
    if (scrollbars == true) {
         windowFeatures = "width=" + width + ",height=" + height + 
                           ",status,resizable,scrollbars,left=" + left + ",top=" + top +
                           ",screenX=" + left + ",screenY=" + top;
    } else {
         windowFeatures = "width=" + width + ",height=" + height + 
                           ",status,left=" + left + ",top=" + top +
                           ",screenX=" + left + ",screenY=" + top;                           
    }                       
    myWindow = window.open(url, name, windowFeatures);  
} 


document.onmouseover = mouseover;
document.ondblclick = mydblclick;
if ( browser == 'Mozilla' ) {
	document.dblclick = mydblclick;
}
