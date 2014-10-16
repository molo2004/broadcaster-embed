/**
 * Embedded Viewer
 */
define(
	[
		'playerapi',
		'view/viewer',
		'view/viewer/syncedmeta'
	],
	function(
		ustreamPlayerAPI,
		view,
		syncedMetaView
	){
		var viewerAPI,
			_embed,
			events = [ // enabled events
				'ready',
				'syncedmeta'
			];

		/**
		 * Initialize
		 * @function ini
		 * @param {Number} cid
		 */
		function init(cid){
			_embed = view.init(cid);
			initViewerAPI();
		}

		/**
		 * Initialize the Viewer API (embedapi)
		 * @function initViewerAPI
		 */
		function initViewerAPI(){
			viewerAPI = ustreamPlayerAPI(_embed);

			// register for events
			events.forEach(function(event){
				viewerAPI.addListener(event, onViewerEvent);
			});
		}

		function onViewerEvent(event, data){
			switch (event) {
				case 'ready':
					// handshake
					break;

				case 'syncedmeta':
					// syncedmeta message received
					onSyncedMeta(data);
					break;
			}
		}

		/**
		 * @function onSyncedMeta
		 * @param {Object} data
		 */
		function onSyncedMeta(data){
			var timestamp = (new Date()).toISOString().substr(11, 12),
				message,
				plusClass;

			// the server always sends an object. if it has only a message property,
			// it will be treated as simple message. otherwise it's a JSON object
			if (typeof data === 'object' && data.hasOwnProperty('message') && Object.keys(data).length === 1) {
				// simple message
				message = data.message;
			} else {
				// JSON object
				message = JSON.stringify(data, null, 4);
				plusClass = 'text-danger';
			}

			// add to DOM
			syncedMetaView.addSyncedMetaMessage(timestamp, message, plusClass);
		}

		return {
			init: init
		};
	}
);
