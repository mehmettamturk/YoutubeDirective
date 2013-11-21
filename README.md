#Youtube Search Module

An Angular.js module to search videos from Youtube.


#How To Use

In first step, you need to add YoutubeModule.js file to your project.
Then you need to inject YoutubeModule from your app file as dependency.

```javascript

angular.module('myApp', ['YoutubeModule', 'myApp.controllers']).

```

Now you can use youtube-search element. It has two attribute for ng-model and video preview.
- preview attribute: There will be a video player when you search videos if it is true.
- target-model-class attribute: Class name of related ng-model element.


```
 <youtube-search target-model-class="targetModelClassName" preview="true"></youtube-search>

 <input class="targetModelClassName" ng-model="selectedYoutubeId"/>
```

In this example, when you click on a video from search, id of the selected video will assigned to selectedYoutubeId variable.

