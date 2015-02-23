
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



