;(function(angular) {
    angular
        .module('n4Directives.interceptor.usuario_nao_autenticado', [])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.unshift('UsuarioNaoAutenticadoInterceptor');
        }])
        .provider('UsuarioNaoAutenticadoInterceptor', [function() {
            var self = this;

            self.urlRedirecionamento = undefined;
            self.statusHttp = 401;

            self.$get = ['$q', '$window', '$log', function($q, $window, $log) {
                var sessaoExpirada = {
                    responseError: function(rejeicao) {
                        if (rejeicao.status === self.statusHttp) {
                            $log.error('Usuário năo autenticado.');
                            $window.location.replace(self.urlRedirecionamento);
                        }

                        return $q.reject(rejeicao);
                    }
                };

                return sessaoExpirada;
            }];
        }]);
}(window.angular));