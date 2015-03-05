
/*================================================================
=>                  Controller = App
==================================================================*/
/*global app*/

app.controller('AppCtrl', function ($rootScope, HateoasResource, hateoasCache, apiRoot, Promise, preCachedResources) {

	'use strict';

    Promise
        .all(preCachedResources.map(function(resource) {
            return hateoasCache.addToCache(resource, function() {});
        }))
        .then(function() {
            return HateoasResource.get(apiRoot);
        })
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



