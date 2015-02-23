
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



