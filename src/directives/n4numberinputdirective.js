(function (angular) {
    'use strict';

    /*jslint regexp: true */

    angular.module('n4Directives.numberInput', [])
        .directive('n4NumberInput', [
            function () {
                return {
                    require: 'ngModel',
                    restrict: 'EAC',
                    replace: true,
                    template: '<input type="text">',
                    link: function (scope, element, attrs, controller) {
                        var getFormattedValue = function (value) {
                                if (!value) {
                                    return '';
                                }
                                return value.trim().replace(/[^0-9]/g, '');
                            },
                            parseValue = function (value) {
                                var formattedValue = getFormattedValue(value);

                                if (formattedValue !== value) {
                                    controller.$setViewValue(formattedValue);
                                    controller.$render();
                                }
                                return formattedValue;
                            };

                        controller.$formatters.unshift(parseValue);
                        controller.$parsers.unshift(parseValue);
                    }
                };
            }
        ]);
}(window.angular));
