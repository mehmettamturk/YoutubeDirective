'use strict';

angular.module('myApp.directives', []).
    directive("youtubeSearch", function($http, YoutubeService) {
        return {
            restrict: "E",        // directive is an Element (not Attribute)
            scope: {              // set up directive's isolated scope
                name: "@",          // name var passed by value (string, one-way)
                amount: "=",        // amount var passed by reference (two-way)
                save: "&",          // save action
                items: "@",
                searchKey: "@"
            },
            template:             // replacement HTML (can use our scope vars here)
                '<div class="youtubeDirective">' +
                    '<input class="searchInput" ng-model="searchKey" placeholder="Write to Search..."/>' +
                    '<div class="acResult" ng-class="{hasItem: items.length}">' +
                        '<div class="acItem" ng-repeat="item in items"> {{item.title}}</div>' +
                    '</div>' +
                '</div>',
            replace: true,        // replace original markup with template
            transclude: false,    // do not copy original HTML content
            controller: [ "$scope", function ($scope) {
            }],
            link: function (scope, element, attrs, controller) {

                scope.$watch('searchKey', function() {
                    if(scope.searchKey && scope.searchKey.length > 2)
                        YoutubeService.search(scope.searchKey, function(data) {
                            scope.items = data.items;
                            console.log(scope.items);
                        });
                    else
                        scope.items = [];
                });

            }
        }
    });
