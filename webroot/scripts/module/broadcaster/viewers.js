/**
 * Viewers Broadcaster Module
 */
define(
	[
		'view/broadcaster/infos'
	],
	function(
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
		function onMessage(viewers){
			// sometimes we get faulty viewer module from the server
			if ((typeof viewers === 'object' && viewers.hasOwnProperty('enabled') && !viewers.enabled) ||
				typeof viewers !== 'number') {

				viewers = 0;
			}

			// set the viewer count
			view.setViewers(viewers);
		}

		return {
			setFlashHandler: setFlashHandler,
			onMessage: onMessage
		};
	}
);
