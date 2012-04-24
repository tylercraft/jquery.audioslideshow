# jQuery Audio Slideshow

Simple audio slideshow that requires jPlayer http://jplayer.org/. 

## Demo
http://tympanus.net/codrops/2012/04/24/audio-slideshow-with-jplayer/

## Getting Started

In the browser:

```html
<script src="http://code.jquery.com/jquery.js"></script>
<script src="jquery.audioslideshow.min.js"></script>

<script>
  // By default the plugin searches for a data-retina attribute on the image
	$('#test-1 img').retina();
</script>
<div class="audio-slideshow" data-audio="audio.mp3" data-audio-duration="161">
	<div class="audio-slides">
		<img src="image.jp" data-thumbnail="thumbnail.jpg" data-slide-time="0">
		<img src="image.jp" data-thumbnail="thumbnail.jpg" data-slide-time="1">
	</div>

	<div class="audio-control-interface">
		<div class="play-pause-container"><a href="javascript:;" class="audio-play" tabindex="1">Play</a><a href="javascript:;" class="audio-pause" tabindex="1">Pause</a></div>
     <div class="time-container"><span class="play-time"></span> / <span class="total-time"></span></div>

	<div class="timeline">
		<div class="timeline-controls"></div>
		<div class="playhead"></div>
	</div>

	 	<div class="jplayer"></div>
	</div>

</div>
```

### Syntax:

```javascript
$('.audio-slideshow').audioSlideshow({
	jPlayerPath: "/lib/swf",
  suppliedFileType: "mp3",
  playSelector: ".audio-play",
	pauseSelector: ".audio-pause",
	currentTimeSelector: ".play-time",
	durationSelector: ".total-time",
	playheadSelector: ".playhead",
	timelineSelector: ".timeline"
});
```

## Release History

* 2012/03/25 - v1.0 - Initial release

## License
Copyright (c) 2012 Tyler Craft
Licensed under the MIT, GPL licenses.