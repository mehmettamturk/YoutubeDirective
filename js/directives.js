'use strict';

angular.module('myApp.directives', []).
    directive("youtubeSearch", function($http, YoutubeService) {
        return {
            restrict: "E",
            scope: {
                items: "@",
                searchKey: "@"
            },
            template:
                '<div class="youtubeDirective">' +
                    '<input class="searchInput" ng-model="searchKey" placeholder="Write to Search..."/>' +
                    '<div class="acResult" ng-class="{hasItem: items.length}">' +
                        '<div class="acItem" ng-repeat="item in items" ng-click="setSelectedItem(item)"> {{item.title}}</div>' +
                    '</div>' +
                '</div>',
            replace: true,
            transclude: false,
            link: function (scope, element, attrs) {
                scope.$watch('searchKey', function() {
                    if(scope.searchKey && scope.searchKey.length > 2)
                        YoutubeService.search(scope.searchKey, function(data) {
                            scope.items = data.items;
                        });
                    else
                        scope.items = [];
                });

                scope.setSelectedItem = function(item) {
                    var searchElement = document.getElementsByClassName(attrs.targetModelClass)[0];
                    angular.element(searchElement).scope().setSelectedVideo(item.player.default);
                }
            }
        }
    });
