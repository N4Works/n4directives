(function (angular) {
    'use strict';

    /*jslint regexp: true */

    angular.module('n4Directives.dateInput', [])
        .directive('n4DateInput', [
            '$filter',
            function ($filter) {
                return {
                    require: 'ngModel',
                    restrict: 'EAC',
                    replace: true,
                    template: '<input type="text">',
                    link: function (scope, element, attrs, controller) {
                        var getFormattedValue = function (value) {
                                var date = new Date(value);
                                if (isNaN(date)) {
                                    return '';
                                }

                                return $filter('date')(date, 'dd/MM/yyyy');
                            },
                            parseValue = function (value) {
                                if (!value) {
                                    return null;
                                }

                                var date = new Date(value);
                                if (isNaN(date)) {
                                    var digits = value.replace(/\D/g, '');
                                    date = new Date(digits.substr(2, 2) + '/' + digits.substr(0, 2) + '/' + digits.substr(4, 4));
                                    if (isNaN(date)) {
                                        return null;
                                    }
                                }

                                var formmatedValue = getFormattedValue(date);
                                controller.$setViewValue(formmatedValue);
                                controller.$render();
                                return date;
                            };

                        element.attr('placeholder','00/00/0000');
                        element.attr('maxlength',10);

                        controller.$formatters.unshift(getFormattedValue);
                        controller.$parsers.unshift(parseValue);
                    }
                };
            }
        ]);
}(window.angular));
