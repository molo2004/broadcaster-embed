define(
	[
		'jquery'
	],
	function(
		$
		){
		var accessTokenUrl = '/accesstoken.php',
			accessToken,
			tokenExpireTime;

		function getQueryParameters(){
			var rawParams = window.location.search.match(/(?:\?|&)([^&=]+)(=[^&]*)/g) || [],
				params = {};

			rawParams.forEach(function(rawParam){
				rawParam = rawParam.substr(1).split('=');

				params[rawParam[0]] = rawParam.length === 2 ? rawParam[1] : null;
			});

			return params;
		}

		function hasAccessToken(){
			var unixNow = Math.floor(new Date().getTime() / 1000);

			return accessToken && unixNow < tokenExpireTime;
		}

		function getAccessToken(callback){
			var queryParams = getQueryParameters();

			if (hasAccessToken()) {
				callback && callback(accessToken);
				return;
			}

			$.getJSON(accessTokenUrl, {code: queryParams.code, state: queryParams.state}, function(response){
				onAccessTokenResponse(response, callback);
			});
		}

		function onAccessTokenResponse(response, callback){
			if (!response.error) {
				accessToken = response.accessToken;
				tokenExpireTime = response.expiresIn;

				window.history &&
				window.history.pushState({}, document.title, window.location.href.replace(/\?.*/, ''));

				callback && callback(accessToken);
			} else if (response.error === 'needAuthorization') {
				window.location.href = response.authUrl;
			} else {
				throw new Error('Error during access token request: ' + response.error);
			}
		}

		function apiCall(method, callback){
			var apiUrl = 'https://api.ustream.tv',
				apiResponseType = 'json';

			if (!hasAccessToken()) {
				getAccessToken(function(){
					apiCall(method, callback);
				});
				return;
			}

			apiUrl += '/' + method + '.' + apiResponseType;

			$.ajax({
				dataType: apiResponseType,
				url: apiUrl,

				headers: {
					'Authorization': 'Bearer ' + accessToken
				},

				success: function(response){
					callback && callback(response);
				}
			});
		}

		function getSelfChannels(callback){
			function onSelfChannelsResponse(response) {
				callback(response.channels);
			}

			apiCall('/users/self/channels', onSelfChannelsResponse);
		}

		return {
			hasAccessToken: hasAccessToken,
			getAccessToken: getAccessToken,
			getSelfChannels: getSelfChannels
		};
	}
);


