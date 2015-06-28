
/*================================================================
=>                  Controller = NewUser
==================================================================*/
/*global app*/

app.controller('NewUserCtrl', function ($scope, $location, HateoasResource) {

	'use strict';

    console.log('Controller ===  NewUserCtrl');

    var viewModel = $scope.newUser = {};

    viewModel.user = new HateoasResource();
    viewModel.user.roles = [];

    viewModel.save = function() {
        viewModel.request = viewModel.user.save($scope.root.getHref('users'))
            .then(function() {
                $location.path('/users');
            }, function(error) {
                viewModel.errors = error.data.errors;
            });
    };
});


/*-----  End of Controller = NewUser  ------*/



