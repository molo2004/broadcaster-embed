/**
 * General Broadcaster Module
 */
define(
	[
		'module/ustream-api',
		'view/broadcaster/infos'
	],
	function(
		ustreamAPI,
		view
	){
		var flashHandler;

		/**
		 * Flash handler setter
		 * @function setFlashHandler
		 * @param {Object} _flashHandler
		 */
		function setFlashHandler(_flashHandler){
			flashHandler = _flashHandler;
		}

		/**
		 * Message event capture
		 * @function onMessage
		 * @param {Object} message
		 */
		function onMessage(message){
			switch (message.event) {
				case 'ready':
					// handshake
					break;

				case 'publishReady':
					// the flash broadcaster is ready to get events
					break;

				case 'aspectRatioChange':
					// camera aspect ratio change
					onAspectRatioChange(message.data);
					break;

				case 'externalStreamOwner':
					// there is a video preview in the console because of external stream or linearfeed
					view.setExternalStreamOwner(message.data);
					break;

				case 'togglePreviewMode':
					// the broadcaster console is in preview mode (because of external stream owner)
					view.setPreviewMode(message.data);
					break;

				case 'requestAccessToken':
					// get access token for the console
					ustreamAPI.getAccessToken(onGetAccessToken);
					break;

			}
		}

		/**
		 *
		 * @function onAspectRatioChange
		 * @param {Number} aspectRatio
		 */
		function onAspectRatioChange(aspectRatio){
			var knownAspectRatios = {
					'0.5625': '16:9',
					'0.75': '4:3'
				},
				precision = 4,
				multiplier = Math.pow(10, precision);

			// create a 4 decimal precision aspect ratio
			aspectRatio = Math.round(aspectRatio * multiplier) / multiplier;

			// display a more friendly message if available
			if (knownAspectRatios.hasOwnProperty(aspectRatio)) {
				aspectRatio = knownAspectRatios[aspectRatio];
			}

			view.setAspectRatio(aspectRatio);
		}

		/**
		 * Access token callback
		 * @function onGetAccessToken
		 * @param {Object} accessToken
		 */
		function onGetAccessToken(accessToken){
			// the flash broadcaster console sends a request to the javascript for access token.
			// after we get it from the Ustream API, we'll send it back via the handler
			flashHandler.sendUpdate('general', 'setAccessToken', accessToken);
		}

		return {
			setFlashHandler: setFlashHandler,
			onMessage: onMessage
		};
	}
);
