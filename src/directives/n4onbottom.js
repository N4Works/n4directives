(function (angular, $) {
  'use strict';

  angular.module('n4Directives.onBottom', [])
    .directive('n4OnBottom', [
      '$document',
      '$window',
      '$timeout',
      function ($document, $window, $timeout) {
        return {
          restrict: 'A',
          scope: {
            onBottom: '&n4OnBottom'
          },
          compile: function (tElement, tAttrs) {
            return function (scope, element, attributes) {
              attributes.$observe('onWindowBottom', function (onWindow) {
                if (/true/i.test(onWindow)) {
                  element.off('scroll');

                  $($window).on('scroll', function () {
                    if (($($window).scrollTop() + $($window).height()) === $($document).height()) {
                      $timeout(scope.onBottom);
                    }
                  });
                } else {
                  $($window).off('scroll');

                  element.on('scroll', function () {
                    if ((element.scrollTop() + element.innerHeight()) >= this.scrollHeight) {
                      $timeout(scope.onBottom);
                    }
                  });
                }
              });

              scope.$on('$destroy', function () {
                element.off('scroll');
                $($window).off('scroll');
              });
            };
          }
        };
      }]);

}(window.angular, window.jQuery));
