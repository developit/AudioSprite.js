/**	@class Manages distinct playable regions within a single shared audio file or stream.
 *	@param {String} url				The URL of an audio file to load.
 *	@param {Object} regions			A map of regions to define within the file. Keys are region names, values get passed to {@link AudioSprite#defineRegion}.
 *	@param {Function} [callback]	A function to call once the audio file has loaded and the instance is ready for playback.
 *	@example
 *		new AudioSprite("path/to/file.mp3", {
 *			tick : [100, 80],
 *			tock : [400, 60]
 *		}, function(sprite) {
 *			sprite.play("tick", function() {
 *				sprite.play("tock");
 *			});
 *		});
 */
function AudioSprite(url, regions, callback) {
	var name;
	this.audio = document.createElement('audio') || (window.Audio && new window.Audio());
	this.regions = {};
	if (regions) {
		for (name in regions) {
			if (regions.hasOwnProperty(name)) {
				this.defineRegion(name, regions[name]);
			}
		}
	}
	this.load(url, callback);
}

AudioSprite.prototype = {
	/**	@ignore */
	construtor : AudioSprite,
	
	/**	Indicates if the Sprite's audio stream is loading. */
	loading : false,
	
	/**	Indicates if the Sprite's audio stream has finished loading. */
	loaded : false,
	
	/**	Stores region information */
	regions : {},
	
	/**	Load an audio file to split into regions.
	 *	@param {String} url				The URL of the audio file/stream to load.
	 *	@callback {Function} [callback]	Called when the file finishes loading, gets passed the AudioSprite instance.
	 */
	load : function(url, callback) {
		var self = this,
			types = {
				'mp3' : 'audio/mpeg',
				'wav' : 'audio/wav',
				'ogg' : 'audio/ogg',
				'oga' : 'audio/ogg'
			},
			ext = (url.match(/[^.]$/gi) || [''])[0].toLowerCase();
		this.url = url;
		this.loading = true;
		this.loaded = false;
		this.audio.type = types[ext] || types.mp3;
		this.audio.onload = function() {
			self.loading = false;
			self.loaded = true;
			if (callback) {
				callback(self);
			}
			self = types = callback = null;
		};
		this.audio.src = url;
	},
	
	/**	Define a named region within the audio sprite. <br />
	 *	@param {String} name			A name for the region. Used when you call <code>play(name)</code>.
	 *	@param {Number|Object} start	The region start time, in ms. OR: An object with "start" and "duration" properties.
	 *	@param {Number} duration		The length of time the region occupies, in ms.
	 */
	defineRegion : function(name, start, duration) {
		if (typeof start==='object') {
			if (start.splice) {
				duration = start[1];
				start = start[0];
			}
			else {
				duration = typeof start.end==='number' ? (start.end-start.start) : (start.duration || start.dur || start.length);
				start = start.start || 0;
			}
		}
		this.regions[name.toLowerCase()] = {
			name : name,
			start : start,
			duration : duration,
			end : start + duration
		};
	},
	
	/**	Play a named region.
	 *	@param {String} regionName		The name of a region to play.
	 *	@param {Function} [callback]	A function to call once the playback is complete.
	 */
	play : function(regionName, callback) {
		var self = this,
			region = this.regions[regionName.toLowerCase()],
			timer;
		this.audio.currentTime = region.start;
		this.audio.play();
		timer = setInterval(function() {
			var time = self.audio.currentTime;
			if (time>=region.end) {
				clearInterval(timer);
				self.audio.pause();
				if (callback) {
					callback(self);
				}
				self = region = timer = callback = null;
			}
		}, 1);
	}
	
};