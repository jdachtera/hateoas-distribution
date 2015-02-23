
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

/*================================================================
=>                  Controller = App
==================================================================*/
/*global app*/

app.controller('AppCtrl', function ($rootScope, HateoasResource, $timeout, apiRoot, HateoasCollection) {

	'use strict';

    HateoasResource.setContentType('application/vnd.uebb.hateoas.collection+json', HateoasCollection);

    HateoasResource.get(apiRoot)
        .then(function (root) {
            $rootScope.root = root;
            return root.getLink('currentUser');
        })
        .then(function (currentUser) {
            $rootScope.currentUser = currentUser;
        });

	console.log('Controller ===  AppCtrl');
});


/*-----  End of Controller = App  ------*/





/*================================================================
=>                  Controller = ListGalleries
==================================================================*/
/*global app*/

app.controller('ListGalleriesCtrl', function ($scope) {

	'use strict';

	console.log('Controller ===  ListGalleriesCtrl');
});


/*-----  End of Controller = ListGalleries  ------*/





/*================================================================
=>                  Controller = ListUsers
==================================================================*/
/*global app*/

app.controller('ListUsersCtrl', ['$scope', function ($scope) {

	'use strict';

	console.log('Controller ===  ListUsersCtrl');
}]);


/*-----  End of Controller = ListUsers  ------*/





/*================================================================
=>                  Controller = NewGallery
==================================================================*/
/*global app*/

app.controller('NewGalleryCtrl', function ($scope, $location, HateoasResource) {

	'use strict';

    $scope.newGallery = new HateoasResource();
    $scope.newGallery.setLink('user', $scope.currentUser);

    $scope.submit = function () {
        $scope.request = $scope.newGallery.save($scope.root.getHref('galleries'))
            .then(function () {
                $location.path('/galleries');
            });
    };


    console.log('Controller ===  NewGalleryCtrl');
});


/*-----  End of Controller = NewGallery  ------*/





/*================================================================
=>                  Controller = NewImage
==================================================================*/
/*global app*/

app.controller('NewImageCtrl', function ($scope, HateoasResource, $location, $routeParams) {

	'use strict';

    $scope.image = new HateoasResource();
    $scope.image.setLink('user', $scope.currentUser);

    $scope.id = $routeParams.id;

    $scope.submit = function () {
        $scope.request = $scope.image.save($scope.root.getHref('images'))
            .then(function () {
                $location.path('/galleries/' + $routeParams.id);
            });
    };


    console.log('Controller ===  NewImageCtrl');
});


/*-----  End of Controller = NewImage  ------*/





/*================================================================
=>                  Controller = NewUser
==================================================================*/
/*global app*/

app.controller('NewUserCtrl', ['$scope', function ($scope) {

	'use strict';

	console.log('Controller ===  NewUserCtrl');
}]);


/*-----  End of Controller = NewUser  ------*/





/*================================================================
=>                  Controller = ShowGallery
==================================================================*/
/*global app*/

app.controller('ShowGalleryCtrl', function ($scope, $routeParams) {

	'use strict';

    $scope.id = $routeParams.id;

    /**
     *
     * @param {HateoasResource} image
     */
    $scope.remove = function(image) {
        image.delete().then(function() {
            $scope.update = true;
        });
    };

	console.log('Controller ===  ShowGalleryCtrl');
});


/*-----  End of Controller = ShowGallery  ------*/





/*================================================================
=>                  Controller = ShowImage
==================================================================*/
/*global app*/

app.controller('ShowImageCtrl', ['$scope', function ($scope) {

	'use strict';

	console.log('Controller ===  ShowImageCtrl');
}]);


/*-----  End of Controller = ShowImage  ------*/





/*================================================================
=>                  Controller = ShowUser
==================================================================*/
/*global app*/

app.controller('ShowUserCtrl', ['$scope', function ($scope) {

	'use strict';

	console.log('Controller ===  ShowUserCtrl');
}]);


/*-----  End of Controller = ShowUser  ------*/




//# sourceMappingURL=all.js.map