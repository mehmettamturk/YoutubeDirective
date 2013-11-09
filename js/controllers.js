'use strict';

angular.module('myApp.controllers', []).controller('MyCtrl1', ['$scope', function($scope) {
    console.log('Controller Loaded.');

    $scope.selectedYoutubeId = 's';

    $scope.setSelectedVideo = function(id) {
        $scope.selectedYoutubeId = id;

    }
}]);