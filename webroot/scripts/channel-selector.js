define(
	[
		'ustream-api',
		'jquery'
	],
	function(
		ustreamAPI,
		$
	) {
		var $domObj = $('#channel-selector'),
			channels,
			onClick;

		function createSelector(callback){
			onClick = callback;

			ustreamAPI.getSelfChannels(onSelfChannelsResponse);
		}

		function onSelfChannelsResponse(response){
			channels = response;

			$domObj.empty()
				.parents('.panel').show();

			Object.keys(channels).forEach(function(cid){
				var channel = channels[cid];

				$('<li/>').append(
					$('<a/>').attr('href', '#' + cid).text(channel.title).click(onChannelSelect)
				).appendTo($domObj);

			});
		}

		function onChannelSelect(e){
			var selectedCid = e.target.hash.substr(1);

			$domObj.parents('.panel').hide();

			onClick && onClick(selectedCid);
		}

		return {
			createSelector: createSelector
		};
	}
);
