/**
 * Embed View
 */
define(
	[
		'jquery'
	],
	function(
		$
	){
		var embedUrlTemplate = '//www.ustream.tv/embed/%cid%?autoplay=1&volume=0',
			embedId = 'Viewer',
			$embed = $('<iframe frameborder="0" width="640" height="392"/>');

		/**
		 * Initialize
		 * @function init
		 * @param {Number} cid
		 * @returns {DOMObject} MTE
		 */
		function init(cid){
			var embedUrl = embedUrlTemplate.replace('%cid%', cid);

			$embed.attr('src', embedUrl).attr('id', embedId);
			$('#' + embedId).replaceWith($embed);

			return $embed[0];
		}

		return {
			init: init
		};
	}
);
