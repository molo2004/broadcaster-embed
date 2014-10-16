/**
 * Broadcaster Infos Viewer
 */
define(
	[
		'jquery'
	],
	function(
		$
	){
		var $infos = $('#BroadcasterInfosPanel'),
			glyphClassBase = 'glyphicon value ',
			glyphClass = ['glyphicon-remove text-danger', 'glyphicon-ok text-success'],
			channelStates = {
				broadcast: false,
				externalStreamOwner: false
			};

		/**
		 * Set the given property on the DOM
		 * @function setProperty
		 * @param {String} name
		 * @param {Boolean}  value
		 */
		function setProperty(name, value){
			var className = glyphClassBase;

			// normalize value to 0 or 1
			value = value > 1 ? 1 : +value;
			// get the check or x mark class
			className += glyphClass[value];

			$infos.find('.' + name).find('.value').removeClass().addClass(className);
		}

		/**
		 * Set broadcasting status
		 * @function setBroadcasting
		 * @param {Boolean} value
		 */
		function setBroadcasting(value){
			setProperty('broadcasting', value);
			setChannelState('broadcast', value);
		}

		/**
		 * set recording status
		 * @function setRecording
		 * @param {Boolean} value
		 */
		function setRecording(value){
			setProperty('recording', value);
		}

		/**
		 * Set external stream owner status
		 * @function setExternalStreamOwner
		 * @param {Boolean} value
		 */
		function setExternalStreamOwner(value){
			setProperty('external-stream-owner', value);
			setChannelState('externalStreamOwner');
		}

		/**
		 * Set preview mode status
		 * @function setPreviewMode
		 * @param {Boolean} value
		 */
		function setPreviewMode(value){
			setProperty('preview-mode', value);
		}

		/**
		 * Set viewer count
		 * @function setViewers
		 * @param {Number} value
		 */
		function setViewers(viewers){
			$infos.find('.viewers .value').text(viewers);
		}

		/**
		 * Set aspect ratio
		 * @function setAspectRatio
		 * @param {Number} value
		 */
		function setAspectRatio(aspectRatio){
			$infos.find('.aspect-ratio .value').text(aspectRatio);
		}

		/**
		 * Set the Channel's state between live and off-air
		 * @function setChannelState
		 * @param {String} source
		 * @param {Boolean} state
		 */
		function setChannelState(source, state){
			var channelState = false;

			state = !!state;

			channelState[source] = state;

			Object.keys(channelStates).forEach(function(source){
				channelState = channelState || channelStates[source];
			});

			setProperty('channel-live', channelState);
		}

		return {
			setBroadcasting: setBroadcasting,
			setAspectRatio: setAspectRatio,
			setExternalStreamOwner: setExternalStreamOwner,
			setPreviewMode: setPreviewMode,
			setViewers: setViewers,
			setRecording: setRecording
		};
	}
);
