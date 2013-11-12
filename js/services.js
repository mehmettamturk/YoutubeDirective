'use strict';

angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services').factory('YoutubeService', function($http, $window) {
    var YoutubeService = {};

    YoutubeService.ready = false;
    YoutubeService.playerId = null;
    YoutubeService.player = null;
    YoutubeService.videoId = 'm4gywHHAAOI';
    YoutubeService.playerHeight = '390';
    YoutubeService.playerWidth = '640';
    YoutubeService.quality = 'hd720';

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
        // API ready?
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
