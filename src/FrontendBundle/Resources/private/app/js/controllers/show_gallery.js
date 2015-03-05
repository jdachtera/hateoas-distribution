
/*================================================================
=>                  Controller = ShowGallery
==================================================================*/
/*global app*/




app.controller('ShowGalleryCtrl', function($scope, $modal, $routeParams) {
    'use strict';

    var viewModel = $scope.showGallery = {};

    viewModel.id = $routeParams.id;

    console.log('Controller ===  ShowGalleryCtrl');
});


/*-----  End of Controller = ShowGallery  ------*/



