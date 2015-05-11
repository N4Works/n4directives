(function (angular) {
  'use strict';

  angular.module('n4Directives.notifications.models', [])
    .factory('N4NotificationModel', function () {
      var N4NotificationModel = function (notification) {
        this.message = null;
        this.primaryButtonText = null;
        this.secondaryButtonText = null;
        this.callback = null;

        angular.extend(this, notification);
      };

      return N4NotificationModel;
    });

}(window.angular));
