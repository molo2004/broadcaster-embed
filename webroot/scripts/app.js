define(
	[
		'ustream-api',
		'channel-selector',
		'flash-handler',
		'bootstrap'
	],
	function(
		ustreamAPI,
		channelSelector,
		flashHandler
	){

		function verifyAccessToken(){
			if (!ustreamAPI.hasAccessToken()) {
				ustreamAPI.getAccessToken(createChannelSelector);
			}
		}

		function createChannelSelector(){
			channelSelector.createSelector(onChannelSelect);
		}

		function onChannelSelect(selectedCid){
			flashHandler.embed(selectedCid);
		}

		verifyAccessToken();
	}
);
