/**
 * Channel Selector View
 */
define(
	[
		'jquery'
	],
	function(
		$
	){
		var $domObj = $('#channel-selector'),
			onChannelSelectCallback;

		/**
		 * Initialize
		 * @function init
		 * @param {Array} channels
		 * @param {Function} callback
		 */
		function init(channels, callback){
			onChannelSelectCallback = callback;

			$domObj.empty()
				.parents('.panel').show();

			// add each channel to the selector
			Object.keys(channels).forEach(function(cid){
				var channel = channels[cid];

				$('<li/>').append(
					$('<a/>').attr('href', '#' + cid).text(channel.title).click(onChannelSelect)
				).appendTo($domObj);

			});
		}

		/**
		 * 
		 * @function onChannelSelect
		 * @param {Event} e
		 */
		function onChannelSelect(e){
			var selectedCid = e.target.hash.substr(1);

			$domObj.parents('.row').hide();

			if (typeof onChannelSelectCallback === 'function') {
				onChannelSelectCallback(selectedCid);
			}
		}

		return {
			init: init
		};
	}
);
