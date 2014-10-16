/**
 * Broadcaster View
 */
define(
	[
		'swfobject',
		'jquery'
	],
	function(
		swfobject,
		$
	){
		var broadcasterOptions = {
			url: '//www.ustream.tv/flash/broadcastair.token.swf',
			id: 'Broadcaster',
			width: 640,
			height: 765,
			minVersion: '11.0.0',
			params: {
				wmode: 'direct',
				allowfullscreen: 'true',
				bgcolor: '#000000',
				allowscriptaccess: 'always'
			},
			flashVars: {
				accessToken: null,
				objectPath: null,
				cid: null,
				retina: window.devicePixelRatio >= 2
			}
		};

		// hack for swfobject
		swfobject = window.swfobject;

		/**
		 * Embed the Broadcaster Console
		 * @function embed
		 * @param {Number} cid
		 * @param {String} objectPath
		 * @param {String} accessToken
		 * @param {Function} callback
		 */
		function embed(cid, objectPath, accessToken, callback){
			// Add plus parameters to flashVars
			broadcasterOptions.flashVars.cid = cid;
			broadcasterOptions.flashVars.objectPath = objectPath;
			broadcasterOptions.flashVars.accessToken = accessToken;

			// embed the broadcaster
			swfobject.embedSWF(
				broadcasterOptions.url,
				broadcasterOptions.id,
				broadcasterOptions.width,
				broadcasterOptions.height,
				broadcasterOptions.minVersion,
				null,
				broadcasterOptions.flashVars,
				broadcasterOptions.params,
				null,
				function(params){ swfobjectCallback(params, callback); }
			);
		}

		/**
		 * Handles the embedding
		 * @function swfobjectCallback
		 * @param {Object}  params
		 * @param {Function} callback
		 */
		function swfobjectCallback(params, callback){
			if (params.success && params.ref) {
				// execute the callback with the flash reference if the embed was successful
				if (typeof callback === 'function') {
					callback(params.ref);
				}

				$(params.ref).parents('.row').show();
			} else if (typeof callback === 'function') {
				// execute the callback with false if the embed failed
				callback(false);
			}
		}

		return {
			embed: embed
		};
	}
);
