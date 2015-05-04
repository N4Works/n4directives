(function (jasmine) {
  'use strict';

  /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
  /*jslint nomen: true */

  describe('n4Notifications', function () {
    var $scope, $compile, $templateCache, element;

    beforeEach(module('n4Directives.notifications', function ($provide) {
      $templateCache = {
        put: jasmine.createSpy(),
        get: jasmine.createSpy()
      };
      $provide.value('$templateCache', $templateCache);
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
    }));

    describe('Creation', function () {
      it('Should load success template', function () {
        expect($templateCache.put).toHaveBeenCalledWith('success.html', [
          '<div class="notification success">',
          '  <div class="text" data-ng-bind="notification.message">',
          '  </div>',
          '  <div class="actions">',
          '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));
      });

      it('Should load information template', function () {
        expect($templateCache.put).toHaveBeenCalledWith('information.html', [
          '<div class="notification information">',
          '  <div class="text" data-ng-bind="notification.message">',
          '  </div>',
          '  <div class="actions">',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));
      });

      it('Should load alert template', function () {
        expect($templateCache.put).toHaveBeenCalledWith('alert.html', [
          '<div class="notification alert">',
          '  <div class="text" data-ng-bind="notification.message"></div>',
          '  <div class="actions">',
          '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));
      });

      it('Should be able to create directive by element', function () {
        var element = angular.element('<n4-notifications></n4-notifications>');
        $compile(element)($scope);
        $scope.$apply();

        expect(element).toBeDefined();
        expect(element[0].tagName).toBe('DIV');
      });
    });
  });
}(window.jasmine));
