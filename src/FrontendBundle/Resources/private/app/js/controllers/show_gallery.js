
/*================================================================
=>                  Controller = ShowGallery
==================================================================*/
/*global app*/




app.controller('ShowGalleryCtrl', function($scope, $modal, $routeParams, Lightbox) {
    'use strict';

    var viewModel = $scope.showGallery = {};

    viewModel.id = $routeParams.id;

    /**
     * @param {HateoasResource} list
     */
    viewModel.removeAll = function(list) {

        list.count = 0;


        list.save()
            .then(function() {
                $scope.showGallery.update = true;
            });
    };

    /**
     *
     * @param {[]} images
     * @param {int} index
     */
    viewModel.openLightboxModal = function(images, index) {
        Lightbox.openModal(images, index);
    };

    viewModel.openUploadModal = function() {
        var modal = $modal.open({
            templateUrl: 'bundles/frontend/templates/upload_images.html'
        });

        modal.result.then(function() {
            viewModel.update = true;
        });
    };

    viewModel.openEditModal = function(image) {
        var scope = $scope.$new();
        scope.image = image;
        var modal = $modal.open({
            templateUrl: 'bundles/frontend/templates/edit_image.html',
            scope: scope
        });
    };

    console.log('Controller ===  ShowGalleryCtrl');
});


/*-----  End of Controller = ShowGallery  ------*/



