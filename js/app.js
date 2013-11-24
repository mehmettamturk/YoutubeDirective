'use strict';

angular.module('myApp', ['YoutubeModule', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/search', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/search2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/search'});
  }]);
