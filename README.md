AudioSprite.js
==============

[![Greenkeeper badge](https://badges.greenkeeper.io/developit/AudioSprite.js.svg)](https://greenkeeper.io/)
Seamlessly play named "sprite" regions within a single shared audio file.  

How To Use It
=============
```JavaScript
new AudioSprite("path/to/file.mp3", {
	tick : [100, 80],
	tock : [400, 60]
}, function(sprite) {
	sprite.play("tick", function() {
		sprite.play("tock");
	});
});
```

Defining Regions
----------------
After creating an AudioSprite instance, you can define named regions within the track that represent individual sounds in three ways.
```JavaScript
/* Create a sprite */
var sprite = new AudioSprite("url");

/* Define a region */
sprite.defineRegion(
	"tick",    // region name
	250,       // start time, in milliseconds
	100        // duration, in milliseconds
);

/* Define a region (option 2) */
sprite.defineRegion("tick", {
	start : 250,
	end : 100
});

/* Define a region (option 3) */
sprite.defineRegion("tick", [250, 100]);
```

Playing Regions Back
--------------------
To play back a region you've defined, call the `play(regionName)` method:

```JavaScript
sprite.play("tick", function() {
	// the tick sounds is now finished playing
	sprite.play("tock");
});
```

Complete API
============

new AudioSprite(url, regions, callback)
---------------------------------------
>	`String url`		The URL of an audio file to load.  
>	`Object regions`	A map of regions. Keys are region names, values get passed to `defineRegion()`.  
>	`Function callback`	Called once the audio file has loaded and the instance is ready for playback.  

sprite.load(url, callback)
--------------------------
Load an audio file/stream to use for spriting.  
>	`String url`		An audio URL to load.  
>	`Function callback`	Called when the file finishes loading, gets passed the instance.

sprite.play(regionName, callback)
---------------------------------
Play the given region.  
>	`String regionName`	The name of a region to play.  
>	`Function callback`	A function to call once the playback is complete.  

sprite.defineRegion(regionName, start, duration)
------------------------------------------------
Define a named region within the audio file.  
>	`String name`		A name for the region. Used when you call `play(name)`.  
>	`Number start`		The region start time, in ms.  
>	`Number duration`	The length of time the region occupies, in ms.  

sprite.defineRegion(regionName, region)
---------------------------------------
Alternative region define syntax. `region` can be:  
> - An Object with `start` and `duration` properties; or  
> - an Array where the first item is `start` and the second item is `duration`.  
> 
> When passing an Object, you can optionally choose to pass `start` and `end`, in which case duration will be calculated for you.


