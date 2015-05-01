(function (angular) {
  'use strict';

  /*jslint regexp: true */

  angular.module('n4Directives.numberInput', [])
    .directive('n4NumberInput', [
      function () {
        return {
          require: 'ngModel',
          restrict: 'EAC',
          link: function (scope, element, attrs, controller) {
            controller.$parsers.push(function (value) {
              if (!value) {
                return '';
              }
              var formattedValue = value.trim().replace(/[^0-9]/g, '');
              if (formattedValue !== value) {
                controller.$setViewValue(formattedValue);
                controller.$render();
              }

              return formattedValue;
            });
          }
        };
      }
    ]);
}(window.angular));
