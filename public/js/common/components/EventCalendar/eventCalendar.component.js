angular.module('snApp.common')
    .directive('eventCalendar', [
        function () {

            return {

                restrict: 'E',
                templateUrl: './js/common/components/EventCalendar/eventCalendar.component.html',
                scope: {
                    userEvents: '='
                },
                controller: ['$scope', '$compile', '$sce', function ($scope, $compile, $sce) {

                    $scope.eventRender = function (event, element, view) {

                        var _tooltipHtml = $sce.trustAsHtml("\'<p>Start Time:" + new Date(event.start) + "</p><p>End Time:" + new Date(event.end) + "</p>\'");
                        element.attr({ 'uib-tooltip-html': _tooltipHtml, 'tooltip-append-to-body': true });
                        $compile(element)($scope);
                    };

                    $scope.uiConfig = {
                        calendar: {
                            height: 450,
                            editable: true,
                            header: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            },
                            defaultDate: new Date('2017-03-06'),
                            eventRender: $scope.eventRender
                        }
                    };
                }]
            };
        }
    ]);
