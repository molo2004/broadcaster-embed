/**
 * SyncedMeta Broadcaster Module
 */
define(
	[
		'view/broadcaster/syncedmeta'
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
		function onMessage(message){
			// it doesn't have any known event
		}

		/**
		 * SyncedMeta message send callback
		 * @function onSubmit
		 * @param {String} message
		 */
		function onSubmit(message){
			if (flashHandler && flashHandler.sendUpdate) {
				flashHandler.sendUpdate('syncedmeta', message);
			}
		}

		// initialize the view
		view.init(onSubmit);

		return {
			setFlashHandler: setFlashHandler,
			onMessage: onMessage
		};
	}
);
