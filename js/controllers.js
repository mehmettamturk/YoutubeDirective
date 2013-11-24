'use strict';

angular.module('myApp.controllers', []).controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
    console.log('Controller Loaded.');

    $scope.showSearch = false;
    $scope.selectedYoutubeId = '';

    $scope.setSelectedVideo = function(id) {
        $scope.selectedYoutubeId = id;
    };
}]);
