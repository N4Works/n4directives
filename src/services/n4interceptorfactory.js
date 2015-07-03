(function (angular) {
    'use strict';

    angular.module('n4Directives.interceptor', [])
        .factory('n4Interceptor', [
            '$q',
            '$log',
            function ($q, $log) {
                var N4Interceptor = function () {
                };

                N4Interceptor.prototype = {
                    responseError: function (rejection) {
                        if (rejection.data) {
                            return $q.reject(new TypeError(rejection.data));
                        }

                        $log.error(rejection);
                        return $q.reject(new TypeError('Serviço indisponível, tente novamente.'));
                    }
                };

                return new N4Interceptor();
            }]);

}(window.angular));
