(function (jasmine) {
    'use strict';

    /*global describe, beforeEach, module, inject, spyOn, angular, it, expect*/
    /*jslint nomen: true */

    describe('n4Interceptor', function () {
        var _rootScope, service;

        beforeEach(module('n4Directives.interceptor'));

        beforeEach(inject(function ($rootScope, n4Interceptor) {
            _rootScope = $rootScope;
            service = n4Interceptor;
        }));

        describe('Functionality', function () {
            it('Should return an exception rejection with the data property value', function () {
                service.responseError({ status: 500, data: 'Exception message' }).catch(function (error) {
                    expect(error instanceof TypeError).toBeTruthy();
                    expect(error.message).toBe('Exception message');
                    expect(error.status).toBe(500);
                });

                _rootScope.$digest();
            });

            it('Should return an exception rejection with default error message', function () {
                service.responseError({}).catch(function (error) {
                    expect(error instanceof TypeError).toBeTruthy();
                    expect(error.message).toBe('Serviço indisponível, tente novamente.');
                    expect(error.status).toBe(400);
                });

                _rootScope.$digest();
            });
        });
    });
}(window.jasmine));
