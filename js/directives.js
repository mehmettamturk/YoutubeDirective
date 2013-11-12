'use strict';

/* Directives */

angular.module('myApp.directives', []).directive('player', function (YoutubeService) {
    return {
        restrict:'A',
        link:function (scope, element, attrs) {
            console.log(element);
            var interVal = setInterval(function() {
                console.log('ss',YoutubeService);
                if (YoutubeService.ready) {
                    YoutubeService.bindVideoPlayer(element[0].id);
                    clearInterval(interVal);
                }
            }, 2000);
        }
    };
}).
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
                    '<div class="acResult" ng-class="{hasItem: items.length, hasPreview: hasPreview}">' +
                        '<div class="items">' +
                            '<div class="acItem" ng-repeat="item in items" ng-click="setSelectedItem(item)">' +
                                '<img src="{{item.thumbnail.sqDefault}}"/>' +
                                '{{item.title}}' +
                            '</div>' +
                        '</div>' +
                        '<div id="searchPreview" player="true"></div>' +
                    '</div>' +
                '</div>',
            replace: true,
            transclude: false,
            link: function (scope, element, attrs) {
                scope.hasPreview = attrs.preview == 'true';

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
                    YoutubeService.playVideo(item.id);

                };

                scope.preview = function(id) {
                    YoutubeService.playVideo();
                };
            }
        }
    });
