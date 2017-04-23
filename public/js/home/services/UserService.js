angular.module('snApp.home')
    .service('UserService', [
        '$q',
        '$http',
        'CommonUtilsService',
        'restClient',
        function ($q, $http, CommonUtilsService, restClient) {

            var self = this;

            var _setDateMap = function (dateMap, slimit, task, totalWorkingHours) {

                if (dateMap[slimit]) {
                    dateMap[slimit].totalWorkingHours += totalWorkingHours;
                    dateMap[slimit].tasksList.push(task);
                } else {
                    dateMap[slimit] = {
                        totalWorkingHours: totalWorkingHours,
                        tasksList: [task]
                    }
                }
            };

            var _calculateWorkedMornHours = function (user, _startDate) {

                var _totalMorningHrsWorked = 0;
                var _userActivity = user.userActivities[_startDate];
                var _tasksList = _userActivity && _userActivity.tasksList;

                if (_tasksList) {
                    _tasksList.forEach(function (task) {

                        _totalMorningHrsWorked += task.totalMorningHrsWorked;
                    });
                }
                return _totalMorningHrsWorked;
            };

            var _getWorkingHrsSpent = function (user, type) {

                var _totalTaskHours = 0;
                user.tasksList.forEach(function (task) {
                    if (task.type === type) {
                        _totalTaskHours += task.totalHoursTaken;
                    }
                });
                return _totalTaskHours;
            };

            var _getAvailability = function (user, startDate, endDate) {

                var _startDate = new Date(startDate.setHours(12, 0, 0, 0));
                var _endDate = new Date(endDate.setHours(12, 0, 0, 0));
                var _flag = false;
                var _totalMorningHrsWorked;
                var _startDate = angular.copy(startDate);
                var _endDate = angular.copy(endDate);

                while (_startDate <= _endDate) {

                    _totalMorningHrsWorked = _calculateWorkedMornHours(user, _startDate);
                    if (_totalMorningHrsWorked > 3) {
                        _flag = true;
                        break;
                    } else {
                        _startDate.setDate(_startDate.getDate() + 1);
                    }
                }
                return _flag;
            };

            var _getBusyHours = function (user) {

                var userActivities = user.userActivities;
                return Object.keys(userActivities).reduce(function (sum, date) {
                    return sum = sum + userActivities[date].totalWorkingHours;
                }, 0);
            };

            var _getWorkingActivity = function (user) {

                var dateMap = {};
                user.tasksList.forEach(function (task) {

                    var _totalWorkingHours = 0;
                    var startingTime = CommonUtilsService.getFormattedDate(task.start_date_time);
                    var endingTime = CommonUtilsService.getFormattedDate(task.end_date_time);
                    var diffInDays = CommonUtilsService.calculateDiffInDays(endingTime, startingTime);;

                    if (diffInDays === 0) {
                        var _slimit = new Date(angular.copy(startingTime).setHours(12, 0, 0, 0));
                        var _elimit = new Date(angular.copy(startingTime).setHours(17, 0, 0, 0));
                        if (startingTime.getHours() <= 12 && endingTime.getHours() > 12) {
                            _totalWorkingHours += CommonUtilsService.calculateDiffInHours(startingTime, _slimit);
                            _totalWorkingHours += CommonUtilsService.calculateDiffInHours(endingTime, _elimit);
                            task.totalMorningHrsWorked = task.totalMorningHrsWorked ? task.totalMorningHrsWorked + CommonUtilsService.calculateDiffInHours(startingTime, _slimit) : CommonUtilsService.calculateDiffInHours(startingTime, _slimit);
                        } else {
                            _totalWorkingHours += CommonUtilsService.calculateDiffInHours(startingTime, endingTime);
                            if (startingTime.getHours() <= 12 && endingTime.getHours() <= 12) {
                                task.totalMorningHrsWorked = task.totalMorningHrsWorked ? task.totalMorningHrsWorked + CommonUtilsService.calculateDiffInHours(startingTime, endingTime) : CommonUtilsService.calculateDiffInHours(startingTime, endingTime);
                            } else {
                                task.totalMorningHrsWorked = 0;
                            }
                        }
                        task.totalHoursTaken = _totalWorkingHours;
                        _setDateMap(dateMap, _slimit, task, _totalWorkingHours)
                    } else {
                        //Todo for larger tasks
                    }
                });
                return dateMap;
            };

            var _appendScheduleList = function (user, usersSchedule) {

                usersSchedule.forEach(function (schedule) {

                    if (schedule.user.value === user.sys_id) {
                        if (user.tasksList) {
                            user.tasksList.push(schedule);
                        } else {
                            user.tasksList = [schedule];
                        }
                    }
                });
                if (!user.tasksList) {
                    user.tasksList = [];
                }
                return user;
            };

            self.fetchUsers = function () {

                var config = {
                    url: 'data/users.json',
                    method: 'GET'
                };
                return restClient.ajax(config);
            };

            self.fetchUsersSchedule = function () {

                var config = {
                    url: 'data/resource_event.json',
                    method: 'GET'
                };
                return restClient.ajax(config);
            };

            self.extendUserObjects = function (users, usersSchedule) {

                var _usersList = [];
                users.forEach(function (user) {

                    var _user = _appendScheduleList(user, usersSchedule);
                    _usersList.push(_user);
                })
                self.mergedUsersList = _usersList;
                return _usersList;
            };

            self.getFormattedTaskList = function (tasksList) {

                return tasksList.reduce(function (formattedTasksList, task) {

                    var _obj = {
                        title: task.type,
                        start: CommonUtilsService.getFormattedDate(task.start_date_time),
                        end: CommonUtilsService.getFormattedDate(task.end_date_time),
                        allDay: false
                    };
                    formattedTasksList.push(_obj);
                    return formattedTasksList;
                }, [])
            };

            self.setUsersActivities = function (usersList) {

                usersList.forEach(function (user) {

                    var workingActivity = _getWorkingActivity(user);
                    user.userActivities = angular.copy(workingActivity);
                });
                return usersList;
            };

            self.setBusyAndFreeHours = function (usersList, startDate, endDate) {

                var _expectedWorkHours = (CommonUtilsService.calculateDiffInDays(endDate, startDate) + 1) * 8;

                self.setUsersActivities(usersList).forEach(function (user) {

                    user.busyHours = _getBusyHours(user);
                    user.freeHours = _expectedWorkHours - user.busyHours;
                });
                return usersList;
            };

            self.checkSchedulingAvailability = function (usersList, startDate, endDate) {

                usersList.forEach(function (user) {

                    _getAvailability(user, startDate, endDate) ? (user.scheduleAvailability = false) : (user.scheduleAvailability = true);
                });
            };

            self.getUsersScheduleDetails = function (startDate, endDate) {

                self.setBusyAndFreeHours(self.mergedUsersList, startDate, endDate);
                self.checkSchedulingAvailability(self.mergedUsersList, startDate, endDate);
                return self.mergedUsersList;
            };

            self.getUsersListForTask = function (usersList, type) {

                var usersTask = [];
                usersList.forEach(function (user) {

                    var totHrsSpent = _getWorkingHrsSpent(user, type);
                    usersTask.push({
                        name: user.name,
                        totalHours: totHrsSpent
                    })
                });
                return usersTask;
            };
        }
    ]);
