(function () {
  'use strict';

  /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
  /*jslint nomen: true */

  describe('n4Notifications', function () {
    beforeEach(module('n4Directives.notifications'));

    describe('Creation', function () {
      it('Should be able to create a model object', inject(function (N4NotificationModel) {
        var notification = new N4NotificationModel();
        expect(angular.isDefined(notification)).toBeTruthy();
      }));

      it('Should be able to create a model object passing an object as reference', inject(function (N4NotificationModel) {
        var callback = function () {},
          notification = new N4NotificationModel({
            message: 'message',
            primaryButtonText: 'primaryButton',
            secondaryButtonText: 'secondaryButton',
            callback: callback
          });

        expect(angular.isDefined(notification)).toBeTruthy();
        expect(notification.message).toBe('message');
        expect(notification.primaryButtonText).toBe('primaryButton');
        expect(notification.secondaryButtonText).toBe('secondaryButton');
        expect(notification.callback).toBe(callback);
      }));
    });
  });
}());
