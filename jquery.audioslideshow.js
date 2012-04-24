(function( $ ) {
  
  $.fn.audioSlideshow = function( options ) {
      
    var settings = {
                      jPlayerPath: "/lib/swf",
                      suppliedFileType: "mp3",
                      playSelector: ".audio-play",
											pauseSelector: ".audio-pause",
											currentTimeSelector: ".play-time",
											durationSelector: ".total-time",
											playheadSelector: ".playhead",
											timelineSelector: ".timeline"
                    };
  
    if(options){
      jQuery.extend(settings,options);
    }
    
    // Begin to iterate over the jQuery collection that the method was called on
    return this.each(function () {
      
      // Cache `this`
      var $that = $(this);
      var $slides = $that.find('.audio-slides').children();
			
			var $currentTime = $that.find(settings.currentTimeSelector);
			var $duration = $that.find(settings.durationSelector);
			var $playhead = $that.find(settings.playheadSelector);
			var $timeline = $that.find(settings.timelineSelector);
			var $playButton = $that.find(settings.playSelector);
			var $pauseButton = $that.find(settings.pauseSelector);
			
			var slidesCount = $slides.length;
			var slideTimes = new Array();
			var audioDurationinSeconds = parseInt($that.attr('data-audio-duration'));
			var isPlaying = false;
			var currentSlide = -1;
			
			$pauseButton.hide();
			
			// Setup slides			
			$slides.each(function(index,el){
				var $el = $(el);
				$el.hide();

				var second = parseInt($el.attr('data-slide-time'));
				var thumbnail = $el.attr('data-thumbnail');
				
				if(index > 0){
					slideTimes.push(second);
				
					var img = '<span><img src="' + thumbnail + '"></span>';
					var $marker = $('<a href="javascript:;" class="marker" data-time="' + second + '">' + img + '</a>');
					var l = (second / audioDurationinSeconds) * $that.width();
	      
					$marker.css('left',l);
				
					$marker.click(function(e){
		        $jPlayerObj.jPlayer("play", parseInt($(this).attr('data-time')) + .5);
		      });
	
					$timeline.append($marker);
				}
			});

    	var $jPlayerObj = $('<div></div>');
      $that.append($jPlayerObj);
    
      $jPlayerObj.jPlayer({
				ready: function () {
					$.jPlayer.timeFormat.padMin = false;
					$(this).jPlayer("setMedia", {
						mp3: $that.attr('data-audio')
					});
				},
				swfPath: settings.jPlayerPath,
				supplied: settings.suppliedFileType,
				preload: 'auto',
				cssSelectorAncestor: ""
			});
			
			$jPlayerObj.bind($.jPlayer.event.timeupdate, function(event) { // Add a listener to report the time play began
				var curTime = event.jPlayer.status.currentTime;
				audioDurationinSeconds = event.jPlayer.status.duration;
				var p = (curTime / audioDurationinSeconds) * 100 + "%";

				$currentTime.text($.jPlayer.convertTime(curTime));
				$duration.text($.jPlayer.convertTime(audioDurationinSeconds));

				$playhead.width(p);

				if(slidesCount){
					var nxtSlide = 0;
					for(var i = 0; i < slidesCount; i++){
						if(slideTimes[i] < curTime){
							nxtSlide = i + 1;
						}
					}

					setAudioSlide(nxtSlide);
				}
			});
			
			$jPlayerObj.bind($.jPlayer.event.play, function(event) { // Add a listener to report the time play began
				isPlaying = true;
			});
			
			$slides.click(function(event){
				$jPlayerObj.jPlayer("play");
			});
			
			$playButton.click(function(event){
				$playButton.hide();
				$pauseButton.show();
				$jPlayerObj.jPlayer("play");
			});
			
			$pauseButton.click(function(event){
				$pauseButton.hide();
				$playButton.show();
				$jPlayerObj.jPlayer("pause");
			});
			
			$timeline.click(function(event){
				var l = event.pageX -  $(this).offset().left;
				var t = (l / $that.width()) * audioDurationinSeconds;

				$jPlayerObj.jPlayer("play", t);
			});
			
			setAudioSlide(0);
			
			function setAudioSlide(n){
				if(n != currentSlide){
					if($slides.get(currentSlide)){
						$($slides.get(currentSlide)).fadeOut();
					}

					$($slides.get(n)).fadeIn();
					currentSlide = n;
				}
			}
			
    });
  };
}(jQuery));