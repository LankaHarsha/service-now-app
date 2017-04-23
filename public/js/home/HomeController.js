angular.module('snApp.home')
    .controller('HomeController', [
        '$scope',
        'UserService',
        '$q',
        'CommonUtilsService',
        'gridConfig',
        function($scope, UserService, $q, CommonUtilsService, gridConfig) {
            
            $scope.users = [];
            $scope.usersDetails = [];
            var usersPromise = UserService.fetchUsers();
            var usersSchedulePromise = UserService.fetchUsersSchedule();

            $scope.init = function(data) {

                $scope.users = UserService.extendUserObjects(data[0].result, data[1].result);
                $scope.usersDetails = UserService.getUsersScheduleDetails(new Date(2017, 02, 06), new Date(2017, 02, 10));
                $scope.maxBusyHours = CommonUtilsService.getMaximum($scope.usersDetails, 'busyHours');
                $scope.maxFreeHours = CommonUtilsService.getMaximum($scope.usersDetails, 'freeHours');
                $scope.busyUsers = CommonUtilsService.filterList($scope.usersDetails, 'busyHours', $scope.maxBusyHours);
                $scope.freeUsers = CommonUtilsService.filterList($scope.usersDetails, 'freeHours', $scope.maxFreeHours);
                $scope.availableUsers = CommonUtilsService.filterList($scope.usersDetails, 'scheduleAvailability', true);
                var _workTasksList = UserService.getUsersListForTask($scope.usersDetails, 'task');
                $scope.workTasksList = CommonUtilsService.sortList(_workTasksList, 'totalHours', 'desc');
                var _meetingTasksList = UserService.getUsersListForTask($scope.usersDetails, 'meeting');
                $scope.meetingTasksList = CommonUtilsService.sortList(_meetingTasksList, 'totalHours', 'desc');
                $scope.meetingTasksKeyConfig = gridConfig['taskDetails'];
                $scope.usrDetailsKeyConfig = gridConfig['usersDetails'];
                $scope.workTasksKeyConfig = gridConfig['taskDetails'];
                $scope.availableUsersKeyConfig = gridConfig['scheduling'];
                $scope.freeUsersKeyConfig = gridConfig['freeHours'];
                $scope.busyUsersKeyConfig = gridConfig['busyHours'];
            };

            $q.all([usersPromise, usersSchedulePromise]).then(function(data) {

                $scope.init(data);
            }, function(error) {

                console.error(error);
            })
        }
    ]);
