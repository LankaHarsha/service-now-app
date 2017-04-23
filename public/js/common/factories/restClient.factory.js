angular.module('snApp.common')
    .factory('restClient', [
        '$q',
        '$http',
        function ($q, $http, CommonUtilsService) {

            var self = {};
            self.ajax = function (config) {

                var defered = $q.defer();
                $http(config).then(function (response) {

                    defered.resolve(response.data);
                }, function (err) {

                    defered.reject(err);
                });
                return defered.promise;
            };
            return self;
        }
    ]);
