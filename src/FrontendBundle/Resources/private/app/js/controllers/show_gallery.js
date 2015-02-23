
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



