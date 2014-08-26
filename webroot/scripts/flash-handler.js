define(
	[
		'ustream-api',
		'swfobject',
		'jquery'
	],
	function(
		ustreamAPI,
		swfobject,
		$
	){
		var U = window.ustream,
			broadcasterOptions = {
				url: 'https://www.ustream.tv/flash/broadcastair.token.swf',
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
					objectPath: 'window.ustream.flash.handler'
				}
			},
			flashBroadcaster,
			handler = {};

		// Hack for swfobject
		swfobject = window.swfobject;

		if (!U.flash) { U.flash = {}; }

		U.flash.handler = handler;

		function embed(cid, callback){
			ustreamAPI.getAccessToken(function(accessToken){
				embedWithAccessToken(accessToken, cid, callback);
			});
		}

		function embedWithAccessToken(accessToken, cid, callback){
			broadcasterOptions.flashVars.accessToken = accessToken;
			broadcasterOptions.flashVars.cid = cid;

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

		function swfobjectCallback(params, callback){
			if (params.success && params.ref) {
				flashBroadcaster = params.ref;

				$(flashBroadcaster).parents('.panel').show();
			}

			callback && callback(flashBroadcaster);
		}

		function createHandlerObject(obj){
			handler.ready = function(){
				// callback for the Flash API
			};

			handler.requestAccessToken = function(){
				if (flashBroadcaster) {
					ustreamAPI.getAccessToken(flashBroadcaster.setAccessToken);
				}
			};
		}

		createHandlerObject(handler);

		return {
			embed: embed,
			handler: handler
		};
	}
);
