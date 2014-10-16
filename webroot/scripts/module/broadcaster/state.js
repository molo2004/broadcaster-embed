/**
 * State Broadcaster Module
 */
define(
	[
		'view/broadcaster/infos',
		'view/broadcaster/syncedmeta'
	],
	function(
		view,
		syncedMetaView
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
				case 'recordStart':
					// record started
					view.setRecording(true);
					break;

				case 'recordStop':
					// record stopped
					view.setRecording(false);
					break;

				case 'broadcastStart':
					// broadcast started
					syncedMetaView.toggle(true);
					view.setBroadcasting(true);
					break;

				case 'broadcastStop':
					// broadcast stopped
					syncedMetaView.toggle(false);
					view.setBroadcasting(false);
					break;
			}
		}

		return {
			setFlashHandler: setFlashHandler,
			onMessage: onMessage
		};
	}
);
