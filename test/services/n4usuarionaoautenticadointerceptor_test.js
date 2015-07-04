describe('n4Directives.interceptor.usuario_nao_autenticado', function() {
    describe('provider', function () {
        var provider;

        beforeEach(module('n4Directives.interceptor.usuario_nao_autenticado', function (UsuarioNaoAutenticadoInterceptorProvider) {
            provider = UsuarioNaoAutenticadoInterceptorProvider;
        }));

        describe('provider', function () {
            it('deve ter o status http como 401', inject(function () {
                expect(provider.statusHttp).toEqual(401);
            }));
        });
    });

    describe('responseError', function () {
        var _http, _httpBackend, _windowMock;
        var UsuarioNaoAutenticadoInterceptor;

        beforeEach(module('n4Directives.interceptor.usuario_nao_autenticado', function ($provide) {
            $provide.constant('$window', {
                location: {
                    replace: angular.noop
                }
            });
        }));

        beforeEach(inject(function ($injector) {
            UsuarioNaoAutenticadoInterceptor = $injector.get('UsuarioNaoAutenticadoInterceptor');
            _http = $injector.get('$http');
            _httpBackend = $injector.get('$httpBackend');
            _windowMock = $injector.get('$window');

            spyOn(_windowMock.location, 'replace').and.callFake(angular.noop);
        }));

        describe('responseError', function () {
            var URL = '/api/alguma-coisa';

            it('năo deve redirecionar o usuário - status diferente de 401', function () {
                _httpBackend.expectGET(URL).respond(400);

                _http.get(URL)

                _httpBackend.flush();

                expect(_windowMock.location.replace).not.toHaveBeenCalled();
            });

            it('deve redirecionar o usuário - status igual a 401', function () {
                _httpBackend.expectGET(URL).respond(401);

                _http.get(URL);

                _httpBackend.flush();

                expect(_windowMock.location.replace).toHaveBeenCalled();
            });
        });
    });
});