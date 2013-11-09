'use strict';

angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services').factory('YoutubeService', function($http) {
    var YoutubeService = {};

    YoutubeService.search = function(searchKey, cb) {
        var url = 'https://gdata.youtube.com/feeds/api/videos?q=' + searchKey + '&v=2&alt=jsonc&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function(data) {
            cb && cb(data.data);
        });
    };

    return YoutubeService;
});
