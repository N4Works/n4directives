(function ($) {
    'use strict';

    /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
    /*jslint nomen: true */

    describe('n4DateInput', function () {
        var $scope, $compile;

        beforeEach(module('n4Directives.dateInput'));

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
        }));

        describe('Creation', function () {
            it('Should be able to create directive by element', function () {
                var element = angular.element('<n4-date-input data-ng-model="value"></n4-date-input>');
                $compile(element)($scope);
                $scope.$apply();

                expect(angular.isDefined(element)).toBeTruthy();
                expect(element[0].tagName).toBe('INPUT');
                expect(element[0].placeholder).toBe('00/00/0000');
                expect(element[0].maxLength).toBe(10);
            });

            it('Should be able to create directive by class', function () {
                var element = angular.element('<input class="n4-date-input" data-ng-model="value">');
                $compile(element)($scope);
                $scope.$apply();

                expect(angular.isDefined(element)).toBeTruthy();
                expect(element[0].tagName).toBe('INPUT');
                expect(element[0].placeholder).toBe('00/00/0000');
                expect(element[0].maxLength).toBe(10);
            });

            it('Should be able to create directive by attribute', function () {
                var element = angular.element('<input n4-date-input="" data-ng-model="value">');
                $compile(element)($scope);
                $scope.$apply();

                expect(angular.isDefined(element)).toBeTruthy();
                expect(element[0].tagName).toBe('INPUT');
                expect(element[0].placeholder).toBe('00/00/0000');
                expect(element[0].maxLength).toBe(10);
            });
        });

        describe('Functionality', function () {
            var element;

            beforeEach(inject(function () {
                element = $compile('<input class="n4-date-input" data-ng-model="value">')($scope);
                $scope.$apply();
            }));

            it('Should render new value to the input', function () {
                $scope.value = new Date('01/14/2015');
                $scope.$apply();
                expect(element.val()).toBe('14/01/2015');
            });

            it('Should render an empty value to the input when the date is invalid', function () {
                $scope.value = new Date('14/01/2015');
                $scope.$apply();
                expect(element.val()).toBe('');
            });

            it('Should set a Date instance on the scope', function () {
                element.val('14/01/2015');
                element.trigger('change');
                $scope.$apply();
                $scope.$digest();
                expect($scope.value).toEqual(new Date('01/14/2015'));
            });

            it('Should set a Date instance on the scope even without any backslash', function () {
                element.val('14/012015');
                element.trigger('change');
                $scope.$apply();
                $scope.$digest();
                expect($scope.value).toEqual(new Date('01/14/2015'));
            });

            it('Should set null on the scope when an invalid date is set', function () {
                element.val('01142015');
                element.trigger('change');
                $scope.$apply();
                $scope.$digest();
                expect($scope.value).toEqual(null);
            });

            it('Should set null on the scope when an empty value is set', function () {
                element.val('01012015');
                element.trigger('change');
                $scope.$apply();
                $scope.$digest();
                element.val('');
                element.trigger('change');
                $scope.$apply();
                $scope.$digest();
                expect($scope.value).toEqual(null);
            });
        });
    });

}(window.jQuery));
