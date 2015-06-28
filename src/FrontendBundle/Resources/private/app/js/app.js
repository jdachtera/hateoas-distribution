
/*================================================================
=>                  App = private
==================================================================*/
/*global angular*/
console.log('Creating app');

var app = angular.module('app', ['ngCookies', 'ngSanitize', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'uebb.hateoas', 'angularGrid', 'bootstrapLightbox']);


app.config(function ($routeProvider, $locationProvider, $httpProvider, LightboxProvider) {
	'use strict';

    $routeProvider
        .when('/galleries', {
            templateUrl: 'bundles/frontend/templates/list_galleries.html'
        })
        .when('/galleries/new', {
            templateUrl: 'bundles/frontend/templates/new_gallery.html'
        })
        .when('/galleries/:id', {
            templateUrl: 'bundles/frontend/templates/show_gallery.html'
        })
        .when('/users', {
            templateUrl: 'bundles/frontend/templates/list_users.html'
        })
        .when('/users/new', {
            templateUrl: 'bundles/frontend/templates/new_user.html'
        })
        .when('/users/:id', {
            templateUrl: 'bundles/frontend/templates/show_user.html'
        })
        .when('/users/:id/edit', {
            templateUrl: 'bundles/frontend/templates/edit_user.html'
        })

        .otherwise({
            redirectTo: '/galleries'
        });

	$locationProvider.html5Mode(true);

	// This is required for Browser Sync to work poperly
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


    LightboxProvider.getImageUrl = function(image) {
        return image.getHref('download', {width: 1280, height: 1280});
    };

    LightboxProvider.getImageCaption = function(image) {
        return image.description;
    };

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