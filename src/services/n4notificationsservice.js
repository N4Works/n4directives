(function (angular) {
  'use strict';

  angular.module('n4Directives.notifications.services', [
    'n4Directives.notifications.models'
  ])
    .service('n4NotificationsService', [
      'N4NotificationModel',
      function (N4NotificationModel) {
        var N4NotificationsService = function () {
          this.notifications = [];
        };

        N4NotificationsService.prototype = {
          notify: function (template, message, primaryButtonText, secondaryButtonText, callback) {
            var self = this;
            this.notifications.unshift(new N4NotificationModel({
              template: template,
              message: message,
              primaryButtonText: primaryButtonText,
              secondaryButtonText: secondaryButtonText,
              callback: function (selected) {
                self.notifications.splice(self.notifications.indexOf(this), 1);

                if (!!callback) {
                  callback(selected);
                }
              }
            }));
          },
          notifySuccess: function (message, primaryButtonText, secondaryButtonText, callback) {
            this.notify('success.html', message, primaryButtonText, secondaryButtonText, callback);
          },
          notifyInformation: function (message, primaryButtonText, callback) {
            this.notify('information.html', message, primaryButtonText, null, callback);
          },
          notifyAlert: function (message, primaryButtonText, secondaryButtonText, callback) {
            this.notify('alert.html', message, primaryButtonText, secondaryButtonText, callback);
          }
        };

        return new N4NotificationsService();
      }]);

}(window.angular));
