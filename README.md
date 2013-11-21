#Youtube Search Module

An Angular.js module to search videos from Youtube.


##How To Use

In first step, you need to add YoutubeModule.js file to your project and add youtube iframe_api script.

```html
<script src="js/YoutubeModule.js"></script>
<script>
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
</script>
```

Then you need to inject YoutubeModule from your app file as dependency.

```javascript
angular.module('myApp', ['YoutubeModule', 'myApp.controllers'])
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

