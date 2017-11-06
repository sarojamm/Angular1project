require.config({
	 
    paths: { 
        'angular': ['//ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min'
                               ,'lib/angular/angular.min' ],
        'angular-resource': 'lib/angular/angular-resource.min',
        'ngSanitize': ['//ajax.googleapis.com/ajax/libs/angularjs/1.2.15/angular-sanitize.min'
       	               ,'lib/angular/angular-sanitize.min' ],
        'angular-ui-bootstrap': 'lib/angular-bootstrap/ui-bootstrap.min', 
        'jquery': 'lib/slick/lib/jquery-1.7.min',  
        'jqueryui': 'lib/slick/lib/jquery-ui-1.8.24.custom.min',  
        'jquery.event.drag':'lib/slick/lib/jquery.event.drag-2.2',
        'jquery.event.drop':'lib/slick/lib/jquery.event.drop-2.2',
        'jquery.mousewheel':'lib/slick/lib/jquery.mousewheel',
         'highstock': 'lib/Highstock-2.0.1/js/highstock',
         'trendline':   'lib/Highstock-2.0.1/trendline'  ,
        'underscore': 'lib/underscore/underscore-min' ,
        'bootstrap' : 'lib/bootstrap.min',
        'exporting': 'lib/Highstock-2.0.1/js/modules/exporting' ,
       'firebugx' :   'lib/slick/lib/firebugx',                      
       'slick.core' : 'lib/slick/slick.core',
       'slick.grid' : 'lib/slick/slick.grid',
       'slick.dataview':     'lib/slick/slick.dataview', 
       'slick.autotooltips': 'lib/slick/plugins/slick.autotooltips',        
       'slick.pager':      'lib/slick/controls/slick.pager',
       'slick.columnpicker':   'lib/slick/controls/slick.columnpicker'  ,       
       'brandkit': 'lib/brandkit'
    },
    shim: {
        'angular': { exports: 'angular' },
        'highstock': { exports: 'highstock' },
        'trendline': { exports: 'trendline', deps: ['highstock'] }, 
        'exporting': { exports: 'exporting' , deps: ['highstock']}, 
        'ngResource': { exports: 'angular-resource', deps: ["angular"] },   
        'ngSanitize': { exports: 'ngSanitize' }, 
        'jquery': { exports: '$' }, 
        'jqueryui': { exports: 'jqueryui' }, 
        
        'jquery.event.drop': { exports: 'jquery.event.drop' }, 
        'jquery.event.drag': { exports: 'jquery.event.drag', deps: [ 'jquery.event.drop'] },         
        'slick.core': { exports: 'slick.core', deps: [ 'jquery.event.drag'] },  
        'slick.grid': { exports: 'slick.grid', deps: [ 'slick.core']}, 
        'slick.dataview': { exports: 'slick.dataview', deps: [ 'slick.grid']}, 
        'slick.autotooltips': { exports: 'slick.autotooltips', deps: [ 'slick.grid']}, 
        'slick.pager': { exports: 'slick.pager', deps: [ 'slick.core','slick.grid']}, 
        'slick.columnpicker': { exports: 'slick.columnpicker', deps: [,'slick.grid']}, 
        'bootstrap': { exports: 'bootstrap' }, 
        'angular-ui-bootstrap': { exports: 'angular-ui-bootstrap', deps: ['angular'] }, 
        'underscore': { exports: '_' } 
    }
    
});
