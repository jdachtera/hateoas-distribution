app.directive('askQuestion', function($modal) {
    return {
        link: function(scope, element, attributes) {
            element.click(function() {
                scope.modal = $modal.open({
                    templateUrl: 'bundles/frontend/templates/ask.html',
                    scope: scope
                });
            });
        },
        
        scope: {
            askQuestion: '@',
            askTitle: '@',
            onYes: '&',
            onNo: '&',
            answerYes: '@',
            answerNo: '@'
        }
    }
});
