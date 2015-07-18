(function (angular) {
    'use strict';

    angular.module('n4Directives', [
        'ngAnimate',
        'n4Directives.numberInput',
        'n4Directives.dateInput',
        'n4Directives.notifications',
        'n4Directives.onBottom',
        'n4Directives.interceptor',
        'n4Directives.interceptor.usuario_nao_autenticado',
        'n4Directives.modal'
    ]);

}(window.angular));
