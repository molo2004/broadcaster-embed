/**
 * Ustream API
 */
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

		/**
		 * Parse query parameters from URL
		 * @function getQueryParameters
		 */
		function getQueryParameters(){
			var rawParams = window.location.search.match(/(?:\?|&)([^&=]+)(=[^&]*)/g) || [],
				params = {};

			rawParams.forEach(function(rawParam){
				rawParam = rawParam.substr(1).split('=');

				params[rawParam[0]] = rawParam.length === 2 ? rawParam[1] : null;
			});

			return params;
		}

		/**
		 * Verify the existence of the access token
		 * @function hasAccessToken
		 * @return {Boolean}
		 */
		function hasAccessToken(){
			var unixNow = Math.floor(new Date().getTime() / 1000);

			// invalidate the access token if it's expired
			return accessToken && unixNow < tokenExpireTime;
		}

		/**
		 *
		 * @function getAccessToken
		 * @param {Function} callback
		 */
		function getAccessToken(callback){
			var queryParams = getQueryParameters();

			if (hasAccessToken()) {
				if (typeof callback === 'function') {
					callback(accessToken);
				}
				return;
			}

			$.getJSON(accessTokenUrl, {code: queryParams.code, state: queryParams.state}, function(response){
				onAccessTokenResponse(response, callback);
			});
		}

		/**
		 *
		 * @function onAccessTokenResponse
		 * @param {Object} response
		 * @param {Function} callback
		 */
		function onAccessTokenResponse(response, callback){
			if (!response.error) {
				accessToken = response.accessToken;
				tokenExpireTime = response.expiresIn;

				if (!hasAccessToken()) {
					throw new Error('It seems the requested access token is faulty.');
				}

				if (window.history !== undefined) {
					window.history.pushState({}, document.title, window.location.href.replace(/\?.*/, ''));
				}

				if (typeof callback === 'function') {
					callback(accessToken);
				}
			} else if (response.error === 'needAuthorization') {
				window.location.href = response.authUrl;
			} else {
				throw new Error('Error during access token request: ' + response.error);
			}
		}

		/**
		 *
		 * @function apiCall
		 * @param {String} method
		 * @param {Function} callback
		 */
		function apiCall(method, callback){
			var apiResponseType = 'json',
				apiUrlTemplate = 'https://api.ustream.tv/%method%.%responseType%',
				apiUrl;

			if (!hasAccessToken()) {
				getAccessToken(function(){
					apiCall(method, callback);
				});
				return;
			}

			// create the api call url
			apiUrl = apiUrlTemplate.replace('%method%', method)
				.replace('%responseType%', apiResponseType);

			$.ajax({
				dataType: apiResponseType,
				url: apiUrl,

				headers: {
					// Send the access token in the header
					'Authorization': 'Bearer ' + accessToken
				},

				success: function(response){
					if (typeof callback === 'function') {
						callback(response);
					}
				}
			});
		}

		/**
		 * Get user channels
		 * @function getSelfChannels
		 * @param {Function} callback
		 */
		function getSelfChannels(callback){
			// internal callback
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


