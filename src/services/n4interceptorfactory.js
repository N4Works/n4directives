(function (angular) {
    'use strict';

    angular.module('n4Directives.interceptor', [])
        .factory('n4Interceptor', [
            '$q',
            '$log',
            function ($q, $log) {
                var N4Interceptor = function (defaultErrorMessage) {
                    this.defaultErrorMessage = defaultErrorMessage || 'An error has occurred. Try again later.';
                };

                N4Interceptor.prototype = {
                    responseError: function (rejection) {
                        if (rejection.data) {
                            return $q.reject(new TypeError(rejection.data));
                        }

                        $log.error(rejection);
                        return $q.reject(new TypeError(this.defaultErrorMessage));
                    }
                };

                return function (defaultErrorMessage) {
                    return new N4Interceptor(defaultErrorMessage);
                };
            }]);

}(window.angular));
