(function (jasmine, $) {
  'use strict';

  /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
  /*jslint nomen: true */

  describe('n4Notifications', function () {
    var $scope, $compile, $timeout, $window, $document;

    beforeEach(module('n4Directives.onBottom'));

    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $window = $injector.get('$window');
      $document = $injector.get('$document');

      $scope.onBottom = jasmine.createSpy();

      spyOn($.fn, 'on').and.callThrough();
      spyOn($.fn, 'off').and.callThrough();
    }));

    describe('Creation', function () {
      var element;

      beforeEach(function () {
        element = angular.element('<ul n4-on-bottom="onBottom()" on-window-bottom="{{onWindowBottom}}"><li>Item 1</li><li>Item 2</li></ul>');
      });

      it('Should be able to compile the directive', function () {
        $compile(element)($scope);
        $scope.$apply();
        expect(element).toBeDefined();
      });

      it('Should remove scroll event from $window when onWindowBottom is not used', function () {
        $scope.onWindowBottom = false;
        $compile(element)($scope);
        $scope.$apply();
        expect($($window).off).toHaveBeenCalledWith('scroll');
      });

      it('Should add scroll event on element when onWindowBottom is not used', function () {
        $scope.onWindowBottom = false;
        $compile(element)($scope);
        $scope.$apply();
        expect(element.on).toHaveBeenCalled();
      });

      it('Should remove scroll event from element when onWindowBottom is used', function () {
        $scope.onWindowBottom = true;
        $compile(element)($scope);
        $scope.$apply();
        expect(element.off).toHaveBeenCalledWith('scroll');
      });

      it('Should add scroll event on $window when onWindowBottom is used', function () {
        $scope.onWindowBottom = true;
        $compile(element)($scope);
        $scope.$apply();
        expect($($window).on).toHaveBeenCalled();
      });

      it('Should change events when onWindowBottom is changed', function () {
        $scope.onWindowBottom = true;
        $compile(element)($scope);
        $scope.$apply();
        expect(element.off).toHaveBeenCalledWith('scroll');
        expect($($window).on).toHaveBeenCalled();
        $scope.onWindowBottom = false;
        $scope.$apply();
        expect($($window).off).toHaveBeenCalledWith('scroll');
        expect(element.on).toHaveBeenCalled();
      });
    });

    describe('Functionality', function () {
      var element;

      beforeEach(function () {
        element = angular.element('<ul n4-on-bottom="onBottom()" on-window-bottom="{{onWindowBottom}}"><li>Item 1</li><li>Item 2</li></ul>');
        $compile(element)($scope);
        $scope.$apply();
      });

      it('Should call "onBottom" event on reach the bottom', function () {
        // Simulating values
        spyOn($.fn, 'scrollTop').and.returnValue(20);
        spyOn($.fn, 'innerHeight').and.returnValue(-10);

        element.trigger('scroll');

        $timeout.flush();

        expect(element.scrollTop).toHaveBeenCalled();
        expect(element.innerHeight).toHaveBeenCalled();
        expect($scope.onBottom).toHaveBeenCalled();
      });

      it('Should only call "onBottom" event on reach the bottom', function () {
        // Simulating values
        spyOn($.fn, 'scrollTop').and.returnValue(-1);
        spyOn($.fn, 'innerHeight').and.returnValue(0);
        element.trigger('scroll');

        $timeout.flush();

        expect(element.scrollTop).toHaveBeenCalled();
        expect(element.innerHeight).toHaveBeenCalled();
        expect($scope.onBottom).not.toHaveBeenCalled();
      });

      it('Should call "onBottom" event on reach the bottom of the window', function () {
        $scope.onWindowBottom = true;
        $scope.$apply();

        // Simulating values
        spyOn($.fn, 'scrollTop').and.returnValue(0);
        spyOn($.fn, 'height').and.returnValue(0);

        $($window).trigger('scroll');

        $timeout.flush();

        expect($($window).scrollTop).toHaveBeenCalled();
        expect($($window).height).toHaveBeenCalled();
        expect($scope.onBottom).toHaveBeenCalled();
      });

      it('Should only call "onBottom" event on reach the bottom of the window', function () {
        $scope.onWindowBottom = true;
        $scope.$apply();

        // Simulating values
        spyOn($.fn, 'scrollTop').and.returnValue(-1);
        spyOn($.fn, 'height').and.returnValue(0);

        $($window).trigger('scroll');

        $timeout.flush();

        expect($($window).scrollTop).toHaveBeenCalled();
        expect($($window).height).toHaveBeenCalled();
        expect($($document).height).toHaveBeenCalled();
        expect($scope.onBottom).not.toHaveBeenCalled();
      });
    });

    describe('Destruction', function () {
      var element;

      beforeEach(function () {
        element = angular.element('<ul n4-on-bottom="onBottom()" on-window-bottom="{{onWindowBottom}}"><li>Item 1</li><li>Item 2</li></ul>');
        $compile(element)($scope);
        $scope.$apply();
      });

      it('Should remove event listener on destroy', function () {
        $scope.$broadcast('$destroy');

        expect(element.off).toHaveBeenCalledWith('scroll');
      });
    });
  });

}(window.jasmine, window.jQuery));
