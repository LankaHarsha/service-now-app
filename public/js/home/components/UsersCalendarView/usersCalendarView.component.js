angular.module('snApp.home')
    .directive('usersCalendarView', [
        function () {

            return {

                restrict: 'E',
                templateUrl: './js/home/components/UsersCalendarView/usersCalendarView.component.html',
                scope: {
                    usersList: '='
                },
                controller: ['$scope', '$timeout', 'CommonUtilsService', 'UserService', function ($scope, $timeout, CommonUtilsService, UserService) {

                    var getUserTasks = function (user) {

                        if(user.tasksList) {
                            return UserService.getFormattedTaskList(user.tasksList);
                        } else {
                            return [];
                        }
                    };

                    $scope.onUserChange = function () {

                        $scope.userEveSchedule = null;
                        $timeout(function() {
                            var userTasks = getUserTasks($scope.selectedUser);
                            $scope.userEveSchedule = [userTasks];
                        });
                    };
                }]
            };
        }
    ]);
