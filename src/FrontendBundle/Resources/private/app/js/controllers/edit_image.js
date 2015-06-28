app.controller('EditImageCtrl', function($scope) {

    $scope.submit = function() {
        $scope.image.save()
            .then(function() {
                $scope.$close();
            }, function(response) {
                $scope.errors = response.data.errors;
            });
    };
});
