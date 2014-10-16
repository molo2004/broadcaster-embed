/**
 * Viewer SyncedMeta Receiver View
 */
define(
	[
		'jquery'
	],
	function(
		$
	){
		var $syncedMetaReceiver = $('#SyncedMetaReceiverPanel').find('tbody');

		/**
		 * Add message to DOM
		 * @function addSyncedMetaMessage
		 * @param {String} timestamp
		 * @param {String} message
		 * @param {String} plusClass
		 */
		function addSyncedMetaMessage(timestamp, message, plusClass){
			var $row = $('<tr><th class="timestamp"></th><td class="message"></td></tr>');

			$row.find('th').text(timestamp).end()
				.find('td').text(message).addClass(plusClass).end()
				.appendTo($syncedMetaReceiver);
		}

		return {
			addSyncedMetaMessage: addSyncedMetaMessage
		};
	}
);
