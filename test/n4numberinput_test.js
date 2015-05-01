(function () {
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
      it('Should create directive from an element', function () {
        var element = angular.element('<n4-number-input data-ng-model="value"></n4-number-input>');
        $compile(element)($scope);
        $scope.$apply();

        expect(element.hasAttribute('type')).toBeTruthy();
        expect(element.attrs('type')).toBe('text');
        expect(element[0].tagName).toBe('input');
      });

      it('Should create directive from an attribute', function () {
        var element = angular.element('<input data-ng-model="value" n4-number-input="">');
        $compile(element)($scope);
        $scope.$apply();

        expect(element.hasAttribute('type')).toBeTruthy();
        expect(element.attrs('type')).toBe('text');
        expect(element[0].tagName).toBe('input');
      });

      it('Should create directive from a class', function () {
        var element = angular.element('<input data-ng-model="value" class="n4-number-input">');
        $compile(element)($scope);
        $scope.$apply();

        expect(element.hasAttribute('type')).toBeTruthy();
        expect(element.attrs('type')).toBe('text');
        expect(element[0].tagName).toBe('input');
      });

      it('Should fail when ngModel is not defined', function () {
        var element = angular.element('<n4-number-input></n4-number-input>');

        expect(function () {
          $compile(element)($scope);
        }).toThrowError();
      });
    });
  });

}());
