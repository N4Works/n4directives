(function (angular) {
    'use strict';

    angular.module('n4Directives', [
        'n4Directives.numberInput',
        'n4Directives.dateInput',
        'n4Directives.notifications',
        'n4Directives.onBottom',
        'n4Directives.interceptor'
    ]);

}(window.angular));

(function (angular) {
    'use strict';

    /*jslint regexp: true */

    angular.module('n4Directives.dateInput', [])
        .directive('n4DateInput', [
            '$filter',
            function ($filter) {
                return {
                    require: 'ngModel',
                    restrict: 'EAC',
                    replace: true,
                    template: '<input type="text">',
                    link: function (scope, element, attrs, controller) {
                        var formatValue = function (value) {
                                if (!value) {
                                    return '';
                                }

                                var numbers = value.replace(/\D/gi, ''),
                                    regexp = new RegExp('^(\\d{2})(\\d{2})(\\d{2})$', 'gi'),
                                    date,
                                    returnValue = function (dateValue) {
                                        return isNaN(dateValue) ? '' : $filter('date')(dateValue, 'dd/MM/yyyy');
                                    };

                                if (regexp.test(numbers)) {
                                    date = new Date(numbers.replace(regexp, '$2/$1/' + (attrs.century || '20') + '$3'));
                                    return returnValue(date);
                                }

                                regexp = new RegExp('^(\\d{2})(\\d{2})(\\d{4})$', 'gi');
                                if (regexp.test(numbers)) {
                                    date = new Date(numbers.replace(regexp, '$2/$1/$3'));
                                    return returnValue(date);
                                }

                                regexp = new RegExp('^\\w{3} \\w{3} \\d{1,2} \\d{4} .*$', 'gi');
                                if (regexp.test(value)) {
                                    return returnValue(new Date(value));
                                }

                                return value === 'Invalid Date' ? '' : value;
                            },
                            parseValue = function (value) {
                                var formattedValue = formatValue(value),
                                    regexp = new RegExp('^(\\d{2})/(\\d{2})/(\\d{4})$', 'gi');
                                if (regexp.test(formattedValue)) {
                                    var date = new Date(formattedValue.replace(regexp, '$2/$1/$3'));
                                    return isNaN(date) ? null : date;
                                }

                                return null;
                            };

                        element.attr('placeholder', '00/00/0000');
                        element.attr('maxlength', 10);

                        controller.$formatters.unshift(formatValue);
                        controller.$parsers.unshift(parseValue);
                    }
                };
            }
        ]);
}(window.angular));

(function (angular, $) {
  'use strict';

  angular.module('n4Directives.notifications', [
    'n4Directives.notifications.services',
    'n4Directives.notifications.models'
  ])
    .run([
      '$templateCache',
      function ($templateCache) {
        $templateCache.put('success.html', [
          '<div class="notification success">',
          '  <div class="text" data-ng-bind="notification.message">',
          '  </div>',
          '  <div class="actions">',
          '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));

        $templateCache.put('alert.html', [
          '<div class="notification alert">',
          '  <div class="text" data-ng-bind="notification.message"></div>',
          '  <div class="actions">',
          '    <a class="secondary" href="" data-ng-if="notification.secondaryButtonText" data-ng-bind="notification.secondaryButtonText" data-ng-click="notification.callback(notification.secondaryButtonText)"></a>',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));

        $templateCache.put('information.html', [
          '<div class="notification information">',
          '  <div class="text" data-ng-bind="notification.message">',
          '  </div>',
          '  <div class="actions">',
          '    <a class="primary" href="" data-ng-bind="notification.primaryButtonText" data-ng-click="notification.callback(notification.primaryButtonText)"></a>',
          '  </div>',
          '</div>'
        ].join(''));
      }
    ])
    .directive('n4Notification', [
      '$compile',
      '$templateCache',
      '$timeout',
      function ($compile, $templateCache) {
        return {
          restrict: 'E',
          replace: true,
          link: function (scope, element, attributes) {
            var $element = $compile($templateCache.get(attributes.template).trim())(scope);
            element.append($element);
          }
        };
      }])
    .directive('n4Notifications', [
      'n4NotificationsService',
      function (service) {
        return {
          restrict: 'E',
          replace: true,
          scope: {},
          template: [
            '<div class="notifications">',
            '  <n4-notification ng-attr-template="{{notification.template}}" data-ng-repeat="notification in service.notifications"></n4-notification>',
            '</div>'
          ].join(''),
          link: function (scope) {
            scope.service = service;
          }
        };
      }]);
}(window.angular, window.jQuery));

(function (angular) {
    'use strict';

    /*jslint regexp: true */

    angular.module('n4Directives.numberInput', [])
        .directive('n4NumberInput', [
            function () {
                return {
                    require: 'ngModel',
                    restrict: 'EAC',
                    replace: true,
                    template: '<input type="text">',
                    link: function (scope, element, attrs, controller) {
                        var getFormattedValue = function (value) {
                                if (!value) {
                                    return '';
                                }
                                return value.trim().replace(/[^0-9]/g, '');
                            },
                            parseValue = function (value) {
                                var formattedValue = getFormattedValue(value);

                                if (formattedValue !== value) {
                                    controller.$setViewValue(formattedValue);
                                    controller.$render();
                                }
                                return formattedValue;
                            };

                        controller.$formatters.unshift(parseValue);
                        controller.$parsers.unshift(parseValue);
                    }
                };
            }
        ]);
}(window.angular));

(function (angular, $) {
  'use strict';

  angular.module('n4Directives.onBottom', [])
    .directive('n4OnBottom', [
      '$document',
      '$window',
      '$timeout',
      function ($document, $window, $timeout) {
        return {
          restrict: 'A',
          scope: {
            onBottom: '&n4OnBottom'
          },
          compile: function (tElement, tAttrs) {
            return function (scope, element, attributes) {
              attributes.$observe('onWindowBottom', function (onWindow) {
                if (/true/i.test(onWindow)) {
                  element.off('scroll');

                  $($window).on('scroll', function () {
                    if (($($window).scrollTop() + $($window).height()) === $($document).height()) {
                      $timeout(scope.onBottom);
                    }
                  });
                } else {
                  $($window).off('scroll');

                  element.on('scroll', function () {
                    if ((element.scrollTop() + element.innerHeight()) >= this.scrollHeight) {
                      $timeout(scope.onBottom);
                    }
                  });
                }
              });

              scope.$on('$destroy', function () {
                element.off('scroll');
                $($window).off('scroll');
              });
            };
          }
        };
      }]);

}(window.angular, window.jQuery));

(function (angular) {
    'use strict';

    angular.module('n4Directives.interceptor', [])
        .factory('n4Interceptor', [
            '$q',
            '$log',
            function ($q, $log) {
                var N4Interceptor = function () {
                    this.defaultErrorMessage = 'Serviço indisponível, tente novamente.';
                };

                N4Interceptor.prototype = {
                    responseError: function (rejection) {
                        if (rejection.data) {
                            return $q.reject(new TypeError(rejection.data));
                        }

                        $log.error(rejection);
                        return $q.reject(new TypeError(this.defaultErrorMessage));
                    }
                };

                return new N4Interceptor();
            }]);

}(window.angular));

(function (angular) {
  'use strict';

  angular.module('n4Directives.notifications.models', [])
    .factory('N4NotificationModel', function () {
      var N4NotificationModel = function (notification) {
        this.message = null;
        this.primaryButtonText = null;
        this.secondaryButtonText = null;
        this.callback = null;

        angular.extend(this, notification);
      };

      return N4NotificationModel;
    });

}(window.angular));

(function (angular) {
  'use strict';

  angular.module('n4Directives.notifications.services', [
    'n4Directives.notifications.models'
  ])
    .service('n4NotificationsService', [
      'N4NotificationModel',
      function (N4NotificationModel) {
        var N4NotificationsService = function () {
          this.notifications = [];
        };

        N4NotificationsService.prototype = {
          notify: function (template, message, primaryButtonText, secondaryButtonText, callback) {
            var self = this;
            this.notifications.unshift(new N4NotificationModel({
              template: template,
              message: message,
              primaryButtonText: primaryButtonText,
              secondaryButtonText: secondaryButtonText,
              callback: function (selected) {
                self.notifications.splice(self.notifications.indexOf(this), 1);

                if (!!callback) {
                  callback(selected);
                }
              }
            }));
          },
          notifySuccess: function (message, primaryButtonText, secondaryButtonText, callback) {
            this.notify('success.html', message, primaryButtonText, secondaryButtonText, callback);
          },
          notifyInformation: function (message, primaryButtonText, callback) {
            this.notify('information.html', message, primaryButtonText, null, callback);
          },
          notifyAlert: function (message, primaryButtonText, secondaryButtonText, callback) {
            this.notify('alert.html', message, primaryButtonText, secondaryButtonText, callback);
          }
        };

        return new N4NotificationsService();
      }]);

}(window.angular));
