(function (jasmine) {
    'use strict';

    /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
    /*jslint nomen: true */

    describe('n4Interceptor', function () {
        var service;

        beforeEach(module('n4Directives.interceptor'));

        beforeEach(inject(function (n4Interceptor) {
            service = n4Interceptor;
        }));

        describe('Functionality', function () {
            it('Should return an exception rejection with the data property value', function () {
                service.responseError({ data: 'Exception message' }).catch(function (error) {
                    expect(error instanceof TypeError).toBeTruthy();
                    expect(error.message).toBe('Exception message');
                });
            });

            it('Should return an exception rejection with default error message', function () {
                service.responseError({}).catch(function (error) {
                    expect(error instanceof TypeError).toBeTruthy();
                    expect(error.message).toBe('Serviço indisponível, tente novamente.');
                });
            });
        });
    });
}(window.jasmine));
