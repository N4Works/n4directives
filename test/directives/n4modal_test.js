(function ($) {
    'use strict';

    /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
    /*jslint nomen: true */

    describe('n4Modal', function () {
        var $scope, $compile, $timeout;

        beforeEach(module('n4Directives.modal'));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $timeout = _$timeout_;
            spyOn($.fn, 'on').and.callThrough();
            spyOn($.fn, 'off').and.callThrough();
            $scope.visible = false;
        }));

        describe('Creation', function () {
            it('Should be able to create directive by attribute', function () {
                var element = angular.element('<div n4-modal="visible"></div>');
                $compile(element)($scope);
                $scope.$apply();

                expect(angular.isDefined(element)).toBeTruthy();
                expect(element[0].tagName).toBe('DIV');
                expect(element.hasClass('n4-modal')).toBeTruthy();
                expect(element.on).toHaveBeenCalled();
            });
        });

        describe('Functionality', function () {
            var element;

            beforeEach(inject(function () {
                element = $compile('<div n4-modal="visible"></div>')($scope);
                $scope.$apply();
            }));

            it('Should be able to show the modal', function () {
                expect(element.hasClass('visible')).toBeFalsy();
                $scope.visible = true;
                $scope.$apply();
                expect(element.hasClass('visible')).toBeTruthy();
            });

            it('Should be able to hide the modal', function () {
                $scope.visible = true;
                $scope.$apply();
                expect(element.hasClass('visible')).toBeTruthy();
                $scope.visible = false;
                $scope.$apply();
                expect(element.hasClass('visible')).toBeFalsy();
            });

            it('Should be able to hide the modal clicking in the background', function () {
                $scope.visible = true;
                $scope.$apply();
                expect(element.hasClass('visible')).toBeTruthy();
                element.find('.n4-modal-background').click();
                $timeout.flush();
                expect(element.hasClass('visible')).toBeFalsy();
            });
        });

        describe('Destruction', function () {
            var element;

            beforeEach(function () {
                element = $compile('<div n4-modal="visible"></div>')($scope);
                $scope.$apply();
            });

            it('Should remove event listener on destroy', function () {
                $scope.$broadcast('$destroy');

                expect(element.off).toHaveBeenCalledWith('click');
            });
        });
    });

}(window.jQuery));
