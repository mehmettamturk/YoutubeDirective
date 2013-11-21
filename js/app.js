'use strict';

angular.module('myApp', ['YoutubeModule', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
