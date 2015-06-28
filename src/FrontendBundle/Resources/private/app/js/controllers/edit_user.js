app.controller('EditUserCtrl', function($scope, $routeParams, $location) {
   var viewModel = $scope.editUser = {};

    viewModel.id = $routeParams.id;

    viewModel.save = function(user) {
        viewModel.request = user.save($scope.root.getHref('users'))
            .then(function() {
                $location.path('/users');
            }, function(error) {
                viewModel.errors = error.data.errors;
            });
    };
});
