
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



