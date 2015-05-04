(function () {
  'use strict';

  /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
  /*jslint nomen: true */

  describe('n4Notifications', function () {
    var service;

    beforeEach(module('n4Directives.notifications'));

    beforeEach(inject(function (n4NotificationsService) {
      service = n4NotificationsService;
    }));

    describe('Functionality', function () {
      it('Should be able to notify success', function () {
        expect(service.notifications.length).toBe(0);
        service.notifySuccess('message', 'primaryButton', 'secondaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        expect(notification).toBeDefined();
        expect(notification.template).toBe('success.html');
        expect(notification.message).toBe('message');
        expect(notification.primaryButtonText).toBe('primaryButton');
        expect(notification.secondaryButtonText).toBe('secondaryButton');
        expect(notification.callback).toBeDefined();
      });

      it('Should be able to notify information', function () {
        expect(service.notifications.length).toBe(0);
        service.notifyInformation('message', 'primaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        expect(notification).toBeDefined();
        expect(notification.template).toBe('information.html');
        expect(notification.message).toBe('message');
        expect(notification.primaryButtonText).toBe('primaryButton');
        expect(notification.secondaryButtonText).toBe(null);
        expect(notification.callback).toBeDefined();
      });

      it('Should be able to notify alert', function () {
        expect(service.notifications.length).toBe(0);
        service.notifyAlert('message', 'primaryButton', 'secondaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        expect(notification).toBeDefined();
        expect(notification.template).toBe('alert.html');
        expect(notification.message).toBe('message');
        expect(notification.primaryButtonText).toBe('primaryButton');
        expect(notification.secondaryButtonText).toBe('secondaryButton');
        expect(notification.callback).toBeDefined();
      });

      it('Should be able to notify choosing manually the template', function () {
        expect(service.notifications.length).toBe(0);
        service.notify('success.html', 'message', 'primaryButton', 'secondaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        expect(notification).toBeDefined();
        expect(notification.template).toBe('success.html');
        expect(notification.message).toBe('message');
        expect(notification.primaryButtonText).toBe('primaryButton');
        expect(notification.secondaryButtonText).toBe('secondaryButton');
        expect(notification.callback).toBeDefined();
      });

      it('Should be able to close a success notification calling the callback', function () {
        expect(service.notifications.length).toBe(0);
        service.notifySuccess('message', 'primaryButton', 'secondaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        notification.callback();
        expect(service.notifications.length).toBe(0);
      });

      it('Should be able to close a information notification calling the callback', function () {
        expect(service.notifications.length).toBe(0);
        service.notifyInformation('message', 'primaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        notification.callback();
        expect(service.notifications.length).toBe(0);
      });

      it('Should be able to close a alert notification calling the callback', function () {
        expect(service.notifications.length).toBe(0);
        service.notifyAlert('message', 'primaryButton', 'secondaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        notification.callback();
        expect(service.notifications.length).toBe(0);
      });

      it('Should be able to close a notification', function () {
        expect(service.notifications.length).toBe(0);
        service.notify('success.html', 'message', 'primaryButton', 'secondaryButton', null);

        expect(service.notifications.length).toBe(1);
        var notification = service.notifications[0];
        notification.callback();
        expect(service.notifications.length).toBe(0);
      });
    });
  });
}());
