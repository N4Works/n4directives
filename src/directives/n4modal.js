/**
 * @ngdoc directive
 * @name naturalSaladsApp.directive:n4BtMenuDirective
 * @description
 * # n4BtMenuDirective
 */

;(function (angular, $) {
    'use strict';

    angular.module('n4Directives.modal', [])
        .directive('n4Modal', [
            '$timeout',
            function ($timeout) {
                return {
                    restrict: 'A',
                    transclude: true,
                    replace: true,
                    scope: {
                        visible: '=n4Modal'
                    },
                    template: '<div class="n4-modal"><div class="n4-modal-container" ng-transclude=""></div><div class="n4-modal-background"></div></div>',
                    link: function (scope, element) {
                        var unwatch = scope.$watch('visible', function (value) {
                            if (!!value) {
                                element.addClass('visible');
                            } else {
                                element.removeClass('visible');
                            }
                        });

                        element.on('click', '.n4-modal-background, .n4-modal-close', function () {
                            $timeout(function () {
                                scope.visible = false;
                            });
                        });

                        scope.$on('$destroy', function () {
                            element.off('click');
                            unwatch();
                        });
                    }
                };
            }]);
}(window.angular, window.jQuery));
