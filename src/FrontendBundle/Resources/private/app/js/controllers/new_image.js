
/*================================================================
=>                  Controller = NewImage
==================================================================*/
/*global app*/

app.controller('NewImageCtrl', function ($scope, $location, $routeParams, HateoasResource, Promise) {

	'use strict';

    var viewModel = $scope.newImage = {};
    viewModel.id = $routeParams.id;
    viewModel.files = [];

    viewModel.submit = function () {
        Promise.all(viewModel.files.map(function(image) {
            return image.save($scope.root.getHref('images'));
        })).then(function () {
            $location.path('/galleries/' + $routeParams.id);
        });

    };


    console.log('Controller ===  NewImageCtrl');
});


/*-----  End of Controller = NewImage  ------*/



