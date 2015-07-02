(function (jasmine) {
    'use strict';

    /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
    /*jslint nomen: true */

    describe('n4Interceptor', function () {
        var factory;

        beforeEach(module('n4Directives.interceptor'));

        beforeEach(inject(function (n4Interceptor) {
            factory = n4Interceptor;
        }));

        describe('Creation', function () {
            it('Should set a default message for error', function () {
                var service = factory();
                expect(service.defaultErrorMessage).toBe('An error has occurred. Try again later.');
            });

            it('Should be able to set a default message for error', function () {
                var service = factory('Default message');
                expect(service.defaultErrorMessage).toBe('Default message');
            });
        });

        describe('Functionality', function () {
            var service;

            beforeEach(function () {
                service = factory('Error message');
            });

            it('Should return an exception rejection with the data property value', function () {
                service.responseError({ data: 'Exception message' }).catch(function (error) {
                    expect(error instanceof TypeError).toBeTruthy();
                    expect(error.message).toBe('Exception message');
                });
            });

            it('Should return an exception rejection with default error message', function () {
                service.responseError({}).catch(function (error) {
                    expect(error instanceof TypeError).toBeTruthy();
                    expect(error.message).toBe('Error message');
                });
            });
        });
    });
}(window.jasmine));
