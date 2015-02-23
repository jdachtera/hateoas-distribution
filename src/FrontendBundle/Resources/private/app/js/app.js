
/*================================================================
=>                  App = private
==================================================================*/
/*global angular*/
console.log('Creating app');

var app = angular.module('app', ['ngCookies', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'uebb.hateoas']);


app.config(function ($routeProvider, $locationProvider, $httpProvider) {
	'use strict';

    $routeProvider
        .when('/galleries', {
            templateUrl: 'bundles/frontend/templates/list_galleries.html',
            controller: 'ListGalleriesCtrl'
        })
        .when('/galleries/new', {
            templateUrl: 'bundles/frontend/templates/new_gallery.html',
            controller: 'NewGalleryCtrl'
        })
        .when('/galleries/:id', {
            templateUrl: 'bundles/frontend/templates/show_gallery.html',
            controller: 'ShowGalleryCtrl'
        })
        .when('/galleries/:id/new', {
            templateUrl: 'bundles/frontend/templates/new_image.html',
            controller: 'NewImageCtrl'
        })
        .otherwise({
            redirectTo: '/galleries'
        });

	$locationProvider.html5Mode(true);

	// This is required for Browser Sync to work poperly
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});


/*================================================================
=>                  private App Run()  
==================================================================*/

app.run(function ($rootScope) {
	
	'use strict';

	console.log('Angular.js run() function...');
});




/* ---> Do not delete this comment (Values) <--- */

/* ---> Do not delete this comment (Constants) <--- */