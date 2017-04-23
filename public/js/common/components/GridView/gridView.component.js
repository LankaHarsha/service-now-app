angular.module('snApp.common')
    .directive('gridView', [
        function () {

            return {

                restrict: 'E',
                templateUrl: './js/common/components/GridView/gridView.component.html',
                scope: {
                    items: '=',
                    keys: '='
                },
                controller: ['$scope', function ($scope) {
                    console.log($scope.items);
                }]
            };
        }
    ]);
