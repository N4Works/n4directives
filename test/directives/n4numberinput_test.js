(function ($) {
  'use strict';

  /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
  /*jslint nomen: true */

  describe('n4NumberInput', function () {
    var $scope, $compile;

    beforeEach(module('n4Directives.numberInput'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      $scope = _$rootScope_.$new();
      $compile = _$compile_;
    }));

    describe('Creation', function () {
      it('Should be able to create directive from an element', function () {
        var element = angular.element('<n4-number-input data-ng-model="value"></n4-number-input>');
        $compile(element)($scope);
        $scope.$apply();

        expect(angular.isDefined(element)).toBeTruthy();
        expect(element[0].tagName).toBe('INPUT');
      });

      it('Should be able to create directive from a class', function () {
        var element = angular.element('<input class="n4-number-input" data-ng-model="value">');
        $compile(element)($scope);
        $scope.$apply();

        expect(angular.isDefined(element)).toBeTruthy();
        expect(element[0].tagName).toBe('INPUT');
      });

      it('Should be able to create directive from an attribute', function () {
        var element = angular.element('<input n4-number-input="" data-ng-model="value">');
        $compile(element)($scope);
        $scope.$apply();

        expect(angular.isDefined(element)).toBeTruthy();
        expect(element[0].tagName).toBe('INPUT');
      });
    });

    describe('Functionality', function () {
      var element, event;

      beforeEach(function () {
        element = angular.element('<input class="n4-number-input" data-ng-model="value">');
        $compile(element)($scope);
        $scope.$apply();
      });

      it('Should be able to add any digit value', function () {
        $scope.value = '0123456789';
        $scope.$apply();
        expect($scope.value).toBe('0123456789');
      });

      it('Should remove any non digit value', function () {
        $scope.value = '01a2b3c4d5,6;7?8^9/';
        $scope.$apply();
        expect($scope.value).toBe('0123456789');
      });
    });
  });

}(window.jQuery));
