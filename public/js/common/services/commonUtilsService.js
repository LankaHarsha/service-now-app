angular.module('snApp.common')
    .service('CommonUtilsService', [
        function() {
            var self = this;

            self.getFormattedDate = function(dateString) {

                var _isoDateRe = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/,
                    matchedDate = dateString.match(_isoDateRe);
                if (matchedDate && matchedDate.length > 0) {
                    var year = matchedDate[1];
                    var month = matchedDate[2] - 1;
                    var dayOfMonth = matchedDate[3];
                    var hour = matchedDate[4];
                    var minute = matchedDate[5];
                    var second = matchedDate[6];
                    return new Date(year, month, dayOfMonth, hour, minute, second);
                }
                return null;
            };

            self.getMaximum = function(list, key) {

                return list.reduce(function(max, obj) {

                    if (obj[key] > max) {
                        max = obj[key];
                    }
                    return max;
                }, 0);
            };

            self.filterList = function(list, key, filterVal) {

                return list.filter(function(obj) {

                    return obj[key] === filterVal;
                })
            };

            self.sortList = function(list, key, type) {

                return list.sort(function(fobj, sobj) {

                    if (fobj[key] > sobj[key]) {
                        return (type === 'desc') ? -1 : 1
                    }
                    if (fobj[key] < sobj[key]) {
                        return (type === 'desc') ? 1 : -1
                    }
                    return 0;
                });
            };


            self.calculateDiffInDays = function(endDate, startDate) {

                var days = 1000 * 60 * 60 * 24;
                var _endDate = angular.copy(endDate);
                var _startDate = angular.copy(startDate);

                return (_endDate.setHours(0, 0, 0, 0) - _startDate.setHours(0, 0, 0, 0)) / days;
            };

            self.calculateDiffInHours = function(startDate, endDate) {

                return (endDate.getTime() - startDate.getTime()) / 3600000;
            };
        }
    ]);
