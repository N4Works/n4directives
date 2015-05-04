(function (angular) {
  'use strict';

  angular.module('n4Directives.notifications', [])
    .run([
      '$templateCache',
      function ($templateCache) {
        $templateCache.put('information.html');
        $templateCache.put('alert.html');
        $templateCache.put('success.html');
        angular.element('body').append('<n4-notifications></n4-notifications>');
      }
    ])
    .directive('n4Notifications', [
      'n4NotificationsService',
      function (service) {
        return {
          restrict: 'E',
          replace: true,
          scope: {},
          template: '<div class="notifications"><n4-notification ng-attr-template="{{notification.template}}" data-ng-repeat="notification in service.notifications"></n4-notification></div>',
          link: function (scope) {
            scope.service = service;
          }
        };
      }]);
}(window.angular));
