/**
 * Config file for youtube player.
 * @type {{videoId: string, playerHeight: number, playerWidth: number, quality: string}}
 *
 * Quality options: 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres', 'default'
 */
var config = {
    videoId: 'cVU8rS7JKNM', // Initial video id.
    playerHeight: 390, // Youtube player height.
    playerWidth: 640, // Youtube player width.
    quality: 'hd720' // Youtube player video quality if video has that quality.
};


/**
 *
 * @type {*|module}
 */
var YoutubeModule = angular.module('YoutubeModule', []);

YoutubeModule.directive('player', function (YoutubeService) {
    return {
        restrict:'A',
        link:function (scope, element) {
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            var interVal = setInterval(function() {
                if (YoutubeService.ready) {
                    console.log(element[0])
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
                    '<div id="searchPreview" player="true" ng-class="{hidden: !searchKey.length && !hasPreview}"></div>' +
                    '<button class="cancel" ng-click="cancel()"> Cancel </button>' +
                    '<button class="addVideo" ng-click="setSelectedItem(item)" ng-show="items.length"> Add Video </button>' +
                '</div>' +
            '</div>',
        replace: true,
        transclude: false,
        link: function (scope, element, attrs) {
            scope.hasPreview = attrs.preview == 'true';
            console.log(scope.hasPreview)
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
                YoutubeService.stopVideo();
            };
        }
    }
});


YoutubeModule.factory('YoutubeService', function($http, $window) {
    var YoutubeService = {
        ready: false,
        playerId: null,
        videoId: config.videoId,
        playerHeight: config.playerHeight,
        playerWidth: config.playerWidth,
        quality: config.quality
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
        if (this.ready && this.playerId) {
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
        if (this.player)
            this.player.loadVideoById({videoId:id,  suggestedQuality:'small'});
    };

    YoutubeService.stopVideo = function() {
        if (this.player)
            this.player.stopVideo();
    };

    return YoutubeService;
});
