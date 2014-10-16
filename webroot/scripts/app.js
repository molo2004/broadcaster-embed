/**
 * Broadcaster Embed Example
 */
define(
	[
		'module/ustream-api',
		'module/broadcaster',
		'module/viewer',
		'view/channel-selector',
		'bootstrap'
	],
	function(
		ustreamAPI,
		broadcaster,
		viewer,
		channelSelector
	){
		var accessToken;

		function verifyAccessToken(){
			if (!ustreamAPI.hasAccessToken()) {
				ustreamAPI.getAccessToken(onGetAccessToken);
			}
		}

		function onGetAccessToken(_accessToken){
			accessToken = _accessToken;

			ustreamAPI.getSelfChannels(onSelfChannelsResponse);
		}

		function onSelfChannelsResponse(channels){
			channelSelector.init(channels, onChannelSelect);
		}

		function onChannelSelect(cid){
			broadcaster.init(cid);
			viewer.init(cid);
		}

		verifyAccessToken();
	}
);
