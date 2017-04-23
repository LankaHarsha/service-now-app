angular.module('snApp.common')
    .directive('panelView', [
        function() {

            return {

                restrict: 'E',
                templateUrl: './js/common/components/PanelView/panelView.component.html',
                scope: {
                    label: '@',
                    usersDetails: '=',
                    keysConfig: '='
                },
                controller: ['$scope', function($scope) {}]
            };
        }
    ]);
