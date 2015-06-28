
/*================================================================
=>                  Controller = NewImage
==================================================================*/
/*global app*/

app.controller('UploadImagesCtrl', function ($scope, $location, $routeParams, HateoasResource, Promise) {

	'use strict';

    var viewModel = $scope.newImage = {};
    viewModel.id = $routeParams.id;
    viewModel.files = [];

    viewModel.createImage = function(gallery) {
        var file = new HateoasResource();
        file.setLink('gallery', gallery);
        console.log(file);
        return file;
    };

    /**
     * @param {HateoasResource} gallery
     */
    viewModel.submit = function (gallery) {
        Promise.all(viewModel.files.map(function(image) {
            return image.save($scope.root.getHref('images'));
        })).then(function () {
            $scope.$close();
        });
    };


    console.log('Controller ===  NewImageCtrl');
});


/*-----  End of Controller = NewImage  ------*/



