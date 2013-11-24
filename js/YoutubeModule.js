var YoutubeModule = angular.module('YoutubeModule', []);

YoutubeModule.directive('player', function (YoutubeService) {
    return {
        restrict:'A',
        link:function (scope, element, attrs) {
            var interVal = setInterval(function() {
                if (YoutubeService.ready) {
                    YoutubeService.bindVideoPlayer(element[0].id);
                    clearInterval(interVal);
                }
            }, 1000);
        }
    };
});

YoutubeModule.directive("youtubeSearch", function($http, YoutubeService) {
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
                        '<div class="acItem" ng-repeat="item in items" ng-click="showPreviev(item)" ng-class="{selected: selectedItem.id == item.id}">' +
                            '<img src="{{item.thumbnail.sqDefault}}"/>' +
                            '{{item.title}}' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="rightPanel">' +
                    '<div id="searchPreview" player="true" ng-show="searchKey.length > 0 && hasPreview"></div>' +
                    '<button class="cancel" ng-click="cancel()"> Cancel </button>' +
                    '<button class="addVideo" ng-click="setSelectedItem(item)" ng-show="items.length"> Add Video </button>' +
                '</div>' +
            '</div>',
        replace: true,
        transclude: false,
        link: function (scope, element, attrs) {
            scope.hasPreview = attrs.preview == 'true';
            scope.selectedItem = {};

            scope.$watch('searchKey', function() {
                if(scope.searchKey && scope.searchKey.length > 2)
                    YoutubeService.search(scope.searchKey, function(data) {
                        scope.items = data.items;
                    });
                else
                    scope.items = [];
            });

            scope.setSelectedItem = function() {
                var searchElement = document.getElementsByClassName(attrs.targetModelClass)[0];
                angular.element(searchElement).scope().setSelectedVideo(scope.selectedItem.player.default);
                angular.element(searchElement).scope().showSearch = false;

            };

            scope.showPreviev = function(item) {
                scope.selectedItem = item;
                YoutubeService.playVideo(item.id);
            };

            scope.cancel = function() {
                var searchElement = document.getElementsByClassName(attrs.targetModelClass)[0];
                angular.element(searchElement).scope().showSearch = false;
            };
        }
    }
});


YoutubeModule.factory('YoutubeService', function($http, $window) {
    var YoutubeService = {
        ready: false,
        playerId: null,
        videoId: 'no',
        playerHeight: '390',
        playerWidth: '640',
        quality: 'hd720'
    };

    YoutubeService.search = function(searchKey, cb) {
        var url = 'https://gdata.youtube.com/feeds/api/videos?q=' + searchKey + '&v=2&alt=jsonc&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function(data) {
            cb && cb(data.data);
        });
    };

    $window.onYouTubeIframeAPIReady = function () {
        YoutubeService.ready = true;
    };

    $window.onPlayerReady = function() {
        YoutubeService.player.playVideo();
    };

    YoutubeService.bindVideoPlayer = function (elementId) {
        YoutubeService.playerId = elementId;
        YoutubeService.loadPlayer();
    };

    YoutubeService.loadPlayer = function () {
        // API ready
        if (this.ready && this.playerId && this.videoId) {
            if(this.player)
                this.player.destroy();

            this.player = this.createPlayer();
        }
    };

    YoutubeService.createPlayer = function () {
        return new YT.Player(this.playerId, {
            height: this.playerHeight,
            width: this.playerWidth,
            videoId: this.videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    };

    YoutubeService.playVideo = function(id) {
        this.player.loadVideoById({videoId:id,  suggestedQuality:'small'});
    };

    return YoutubeService;
});
