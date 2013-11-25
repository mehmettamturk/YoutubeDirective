#Youtube Search Module

An Angular.js module to search videos from Youtube.


##How To Use

In first step, you need to inject YoutubeModule from your app file as dependency.

```javascript
angular.module('myApp', ['YoutubeModule', 'myApp.controllers'])
```

In YoutubeModule.js file, you can see config object. You can easily change player attributes from config file.

```javascript
var config = {
    videoId: 'cVU8rS7JKNM', // Initial video id.
    playerHeight: 390, // Youtube player height.
    playerWidth: 640, // Youtube player width.
    quality: 'hd720' // Youtube player video quality if video has that quality.
};
```

Now you can use youtube-search element. It has two attribute for ng-model and video preview.
- __preview attribute__: There will be a video player when you search videos if it is true.
- __target-model-class attribute__: Class name of related ng-model element.


```html
 <youtube-search target-model-class="targetModelClassName" preview="true"></youtube-search>
 
 <input class="targetModelClassName" ng-model="selectedYoutubeId"/>
```

In this example, when you click on a video from search, id of the selected video will assigned to selectedYoutubeId variable.

---

