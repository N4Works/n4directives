(function (jasmine) {
  'use strict';

  /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
  /*jslint nomen: true */

  describe('n4Notifications', function () {
    var $scope, $compile, $templateCache, element,
      successTemplate, alertTemplate, informationTemplate;

    beforeEach(module('n4Directives.notifications', function ($provide) {
      $templateCache = jasmine.createSpyObj('$templateCache', ['put', 'get']);
      $provide.value('$templateCache', $templateCache);

      successTemplate = [
        '<div class="notification success">',
        '  <div class="text" data-ng-bind="notification.message">',
        '  </div>',
        '  <div class="actions">',
        '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
        '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
        '  </div>',
        '</div>'
      ].join('');

      alertTemplate = [
        '<div class="notification alert">',
        '  <div class="text" data-ng-bind="notification.message"></div>',
        '  <div class="actions">',
        '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
        '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
        '  </div>',
        '</div>'
      ].join('');

      informationTemplate = [
        '<div class="notification information">',
        '  <div class="text" data-ng-bind="notification.message">',
        '  </div>',
        '  <div class="actions">',
        '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
        '  </div>',
        '</div>'
      ].join('');
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
    }));

    describe('Creation', function () {
      it('Should load success template', function () {
        expect($templateCache.put).toHaveBeenCalledWith('success.html', successTemplate);
      });

      it('Should load information template', function () {
        expect($templateCache.put).toHaveBeenCalledWith('information.html', informationTemplate);
      });

      it('Should load alert template', function () {
        expect($templateCache.put).toHaveBeenCalledWith('alert.html', alertTemplate);
      });

      it('Should be able to create directive by element', function () {
        var element = angular.element('<n4-notifications></n4-notifications>');
        $compile(element)($scope);
        $scope.$apply();

        expect(element).toBeDefined();
        expect(element[0].tagName).toBe('DIV');
      });
    });

    describe('Functionality', function () {
      var element, service;

      beforeEach(inject(function (n4NotificationsService) {
        service = n4NotificationsService;

        element = angular.element('<n4-notifications></n4-notifications>');
        $compile(element)($scope);
        $scope.$apply();

        expect(element).toBeDefined();
        expect(element[0].tagName).toBe('DIV');
      }));

      it('Should be able to add a success notification', function () {
        $templateCache.get.and.returnValue(successTemplate);
        service.notifySuccess('Success', 'Ok', 'Undo', null);

        $scope.$apply();

        expect($templateCache.get).toHaveBeenCalledWith('success.html');
        expect(element.find('.notification.success').get(0)).toBeDefined();
      });

      it('Should be able to add an alert notification', function () {
        $templateCache.get.and.returnValue(alertTemplate);
        service.notifyAlert('Alert', 'Ok', 'Cancel', null);

        $scope.$apply();

        expect($templateCache.get).toHaveBeenCalledWith('alert.html');
        expect(element.find('.notification.alert').get(0)).toBeDefined();
      });

      it('Should be able to add an information notification', function () {
        $templateCache.get.and.returnValue(informationTemplate);
        service.notifyInformation('Information', 'Ok', null);

        $scope.$apply();

        expect($templateCache.get).toHaveBeenCalledWith('information.html');
        expect(element.find('.notification.information').get(0)).toBeDefined();
      });
    });
  });
}(window.jasmine));
