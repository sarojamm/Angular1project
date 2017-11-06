'use strict';
 
define(['service','underscore','jquery'], function(services,_,$ ) {	
	services.service("chartDefService", function($resource) { 
		var seriesOptions = [];
		var scatterchart ={ 
		global: {		
			useUTC: false
		},
		credits: {
		       enabled: false
		    },
		chart: {
			reflow: true,	
			renderTo : 'chartcontainer', 
			zoomType: 'xy',
            type: '' 
        },
        title: {
            text: ' '
        },
        xAxis: {
            type: 'datetime', 
            dateTimeLabelFormats: {
                second: '%Y-%m-%d %H:%M:%S',
                minute: '%Y-%m-%d %H:%M',
                hour: '%Y-%m-%d %H:%M',
                day: '%Y %m-%d',
                week: '%Y %m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            labels: {                 
                /* align: 'right',
                 autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90]*/
            	rotation: -45
            }
        },
        yAxis: [{             
            title: {
                text: ' '
            }, 
            opposite: false
        }, {
            title: {
                text: ''
            },
            
            opposite: true
        }],
       legend: {
           enabled: true,			             
           backgroundColor: '#FCFFC5',
           borderColor: 'black',
           borderWidth: 2, 
           maxHeight: 80,
           shadow: true
       }, 
        plotOptions: {
        	series: {
                minPointLength: 3
            },
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                } 
            }
        },
        rangeSelector : {
            enabled: false
        },
        series: [],
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>' 
        },
        exporting: {
            enabled: true,
            url:'https://mydummysite.com:8080/highcharts-export-web/'
        }
    };
		this.getScatterchart = function ( ) {  	    	            
		   	  return scatterchart;
		}
//	    var piechart =  {
//	      yAxisMin : null, 
//	      xAxisMax : null,
//		  chart : {
//	        	renderTo : 'piechart', 
//                plotBackgroundColor: null,
//	            plotBorderWidth: null,
//	            plotShadow: false
//	        },
//	        title: {
//	            text: ''
//	        },	        
//	        xAxis: {
//	            categories: []
//	        },
//	        tooltip: {
//	    	    pointFormat: '{series.name}: <b>{point}</b>'
//	        },
//	        plotOptions: {
//	            pie: {
//	                allowPointSelect: true,
//	                cursor: 'pointer',
//	                dataLabels: {
//	                    enabled: true,
//	                    format: '<b>{point.name}</b>: {point}',
//	                    style: {
//	                      
//	                    }
//	                }
//	            }
//	        },
//	        center: [100, 80],
//            size: 100,
//            showInLegend: false,            
//	        labels: {
//	            items: [{
//	                html: '',
//	                style: {
//	                    left: '50px',
//	                    top: '18px',
//	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
//	                }
//	            }]
//	        },
//	        series: [{
//	            type: 'pie',
//	            name: 'ELPT Data',
//	            data: [   ]
//	        }]       
//		}; 
//		this.getPiechart = function ( ) {  	    	            
//	   	  return piechart;
//	   	}
		var stockchart ={
				chart: {
	            	renderTo : 'chartcontainer', 
	                type: 'line',
	                plotBackgroundColor: null,
	                plotBorderWidth: null,
	                plotShadow: false
	        },
					legend: {
			            enabled: true,			             
			            backgroundColor: '#FCFFC5',
			            borderColor: 'black',
			            borderWidth: 2, 
			            maxHeight: 80,
			            shadow: true
			        },
			        rangeSelector: {
	                    inputEnabled: $('#chartcontainer').width() > 480,
	                    selected: 4
	                },
	                xAxis: {
		                categories: [ ]
		            },
	                yAxis: [{
	                	
	                    labels: {
	                        formatter: function () {
	                            return (this.value > 0 ? ' + ' : '') + this.value + '%';
	                        }
	                    },
	                    plotLines: [{
	                        value: 0.696,
	                        width: 2,
	                        color: 'red'
	                    }]
	                }],

	                plotOptions: {
	                    series: {
	                        compare: 'percent'
	                    }
	                } ,
	                tooltip: {
	                    pointFormat: '<span style="color:{series.color}">{series.name}</span>:*********** <b>{point.y}</b> ({point.change}%)<br/>',
	                    valueDecimals: 2
	                },

	                series: [{
	                	   name: '',
	                	   data: []
	                    }
	                ] 
          };
		
		 this.getStockchart = function ( ) {  	    	            
		       return stockchart;
		   }
		 var stockchart2 ={ 
				     chart: {
		            	renderTo : 'chartcontainer', 
		                type: 'line',
		                plotBackgroundColor: null,
		                plotBorderWidth: null,
		                plotShadow: false
		            },
	                rangeSelector: {
	                    inputEnabled: $('#chartcontainer').width() > 480,
	                    selected: 4
	                },
	                legend: {
			            enabled: true,			             
			            backgroundColor: '#FCFFC5',
			            borderColor: 'black',
			            borderWidth: 2, 
			            maxHeight: 80,
			            shadow: true
			        },
	                yAxis: [{	                	
	                	lineWidth: 1,
	                	 opposite: false,
	                    title: {
	                        text: 'Left Axis'
	                    },
	                    labels: {
	                        formatter: function () {
	                            return (this.value > 0 ? ' + ' : '') + this.value + '';
	                        }
	                    },
	                    plotLines: [{
	                        value: 0,
	                        width: 1,
	                        color: 'silver'
	                    }]
	                } ,
	                {	                	 
	                    lineWidth: 1,
	                    opposite: true,
	                    title: {
	                        text: 'Right Axis'
	                    },
	                    labels: {
	                        formatter: function () {
	                            return (this.value > 0 ? ' + ' : '') + this.value + '';
	                        }
	                    }
	                }],
	                
	                tooltip: {
	                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
	                    valueDecimals: 2
	                },

	                series: []
	            };
	     this.getStockchart2 = function ( ) {  	    	            
			return stockchart2;
		 }
		 this.getGolbolchart = function ( ) {  	    	            
		       return golbolchart;
		   }
//		 var golbolchart  = {} ; 
//		     golbolchart = {
//				chart: {
//		            	renderTo : 'chartcontainer', 
//		                type: 'line',
//		                plotBackgroundColor: null,
//		                plotBorderWidth: null,
//		                plotShadow: false
//		        },
//		        title: {
//			            text: 'ELPT Chart website, 2014',
//			            x: -20 //center
//			    },			        
//	            subtitle: {
//	                text: 'Source: ELPT',
//	                x: -20
//	            },
//	            xAxis: {
//	                categories: [ ]
//	            },
//	            yAxis: {
//	                title: {
//	                    text: 'MME'
//	                },
//	                alternateGridColor: '#FDFFD5',
//	                plotLines: [{
//	                    value: 0,
//	                    width: 1,
//	                    color: '#808080'
//	                }]
//	            },
//	            tooltip: {
//	                valueSuffix: 'M'
//	            },
//	            legend: {  	                 
//	                borderWidth: 2
//	            },
//	            series: [ ]
//		    }; 
	});
});