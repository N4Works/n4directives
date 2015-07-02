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
                        var formatValue = function (value) {
                                if (!value) {
                                    return '';
                                }

                                var numbers = value.replace(/\D/gi, ''),
                                    regexp = new RegExp('^(\\d{2})(\\d{2})(\\d{2})$', 'gi'),
                                    date,
                                    returnValue = function (dateValue) {
                                        return isNaN(dateValue) ? '' : $filter('date')(dateValue, 'dd/MM/yyyy');
                                    };

                                if (regexp.test(numbers)) {
                                    date = new Date(numbers.replace(regexp, '$2/$1/' + (attrs.century || '20') + '$3'));
                                    return returnValue(date);
                                }

                                regexp = new RegExp('^(\\d{2})(\\d{2})(\\d{4})$', 'gi');
                                if (regexp.test(numbers)) {
                                    date = new Date(numbers.replace(regexp, '$2/$1/$3'));
                                    return returnValue(date);
                                }

                                regexp = new RegExp('^\\w{3} \\w{3} \\d{1,2} \\d{4} .*$', 'gi');
                                if (regexp.test(value)) {
                                    return returnValue(new Date(value));
                                }

                                return value === 'Invalid Date' ? '' : value;
                            },
                            parseValue = function (value) {
                                var formattedValue = formatValue(value),
                                    regexp = new RegExp('^(\\d{2})/(\\d{2})/(\\d{4})$', 'gi');
                                if (regexp.test(formattedValue)) {
                                    var date = new Date(formattedValue.replace(regexp, '$2/$1/$3'));
                                    return isNaN(date) ? null : date;
                                }

                                return null;
                            };

                        element.attr('placeholder', '00/00/0000');
                        element.attr('maxlength', 10);

                        controller.$formatters.unshift(formatValue);
                        controller.$parsers.unshift(parseValue);
                    }
                };
            }
        ]);
}(window.angular));
