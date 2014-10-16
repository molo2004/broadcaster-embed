/**
 * Broadcaster SyncedMeta Sender View
 */
define(
	[
		'jquery'
	],
	function(
		$
	){
		var $syncedMetaSenderForm = $('#SyncedMetaSenderForm'),
			$syncedMetaMessage = $('#SyncedMetaMessage'),
			enabled,
			onSubmitCallback;

		/**
		 * Initialize
		 * @function init
		 * @param {Function} callback
		 */
		function init(callback){
			onSubmitCallback = callback;

			toggle(false);
			attachEventHandlers();
		}

		/**
		 *
		 * @function attachEventHandlers
		 */
		function attachEventHandlers(){
			$syncedMetaSenderForm.find('.btn-send').click(onSendSyncedMetaMessage);
		}

		/**
		 * Toggle the SyncedMeta form's availability
		 * @function toggle
		 * @param {Boolean} _enabled
		 */
		function toggle(_enabled){
			var $inputs = $syncedMetaSenderForm.find('input, textarea, button'),
				disabled = _enabled ? null : 'disabled'; // simplest way to handle input's disabled state

			enabled = !!_enabled;
			$inputs.attr('disabled', disabled);
		}

		/**
		 * Send the given message
		 * @function onSendSyncedMetaMessage
		 * @param {Event} e
		 */
		function onSendSyncedMetaMessage(e){
			var message = $syncedMetaMessage.val(),
				errorClass = 'has-error';

			e.preventDefault();
			e.stopPropagation();

			// don't send the message if there is no broadcast
			if (!enabled) {
				return;
			}

			// parse JSON if needed
			if ($syncedMetaSenderForm.find('.json-object').prop('checked')) {
				try {
					message = JSON.parse(message);
				} catch (e) {
					// error handling
					$syncedMetaMessage.parent().addClass(errorClass);
					return;
				}
			}

			$syncedMetaMessage.parent().removeClass(errorClass);

			if (typeof onSubmitCallback === 'function') {
				onSubmitCallback(message);
			}
		}

		return {
			init: init,
			toggle: toggle
		};
	}
);
