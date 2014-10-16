/**
 * Broadcaster
 */
define(
	[
		'module/flash-handler',
		'module/ustream-api',
		'view/broadcaster'
	],
	function(
		flashHandler,
		ustreamAPI,
		view
	){
		var instance,
			cid;

		/**
		 * Initialize
		 * @function init
		 * @param {Number} _cid
		 */
		function init(_cid){
			cid = _cid;

			// create the flash console with the accesstoken
			ustreamAPI.getAccessToken(embedBroadcaster);
		}

		/**
		 * Create the flash broadcaster console
		 * @function embedBroadcaster
		 * @param {String} accessToken
		 */
		function embedBroadcaster(accessToken){
			view.embed(cid, flashHandler.objectPath, accessToken, initHandlerObject);
		}

		/**
		 * Initialize the handler object for the flash
		 * @function initHandlerObject
		 * @param {Object} _instance
		 */
		function initHandlerObject(_instance){
			instance = _instance;
			flashHandler.init(instance);
		}

		return {
			init: init
		};
	}
);
