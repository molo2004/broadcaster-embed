/**
 * Flash handler
 */
define(
	[
		'module/ustream-api',
		'module/broadcaster/general',
		'module/broadcaster/state',
		'module/broadcaster/syncedmeta',
		'module/broadcaster/viewers'
	],
	function(
		ustreamAPI,
		generalModule,
		stateModule,
		syncedMetaModule,
		viewersModule
	){
		var U = window.ustream, // shorthand
			instance,
			modules = { // available modules
				general: generalModule,
				broadcastStatus: stateModule,
				viewers: viewersModule,
				syncedMeta: syncedMetaModule
			},
			handler = {},
			objectPath = 'window.ustream.flash.handler'; // global variable for the handler object

		/**
		 * Initialize
		 * @function init
		 * @param {Object} _instance
		 */
		function init(_instance){
			instance = _instance;

			// setup the handler's path for the flash
			if (!U.flash) { U.flash = {}; }

			// setup the handler object
			handler = {
				/**
				 * Handshake
				 * @function ready
				 */
				ready: function(){
					var moduleCallbacks = {};

					// expose and init the enabled modules to the global variable
					U.flash.module = {};
					Object.keys(modules).forEach(function(name){
						var module = modules[name];

						U.flash.module[name] = module;

						module.setFlashHandler(handler);
						moduleCallbacks[name] = 'window.ustream.flash.module.' + name + '.onMessage';
					});

					// after the init we send the modules to the flash
					instance.ready(moduleCallbacks);
				},

				/**
				 * The flash console needs a new access token
				 * @function requestAccessToken
				 */
				requestAccessToken: function(){
					if (instance) {
						ustreamAPI.getAccessToken(instance.setAccessToken);
					}
				},

				/**
				 * Send module update to the flash
				 * @function sendUpdate
				 * @param {String} name
				 * @param {String|Mixed} event|data
				 * @param {Mixed|null} data
				 */
				sendUpdate: function(name, event, data){
					var moduleUpdate = {};

					switch (name) {
						case 'general':
							// general module
							moduleUpdate[name] = {
								event: event,
								data: data
							};
							break;

						case 'syncedmeta':
							// syncedmeta module
							data = event;

							moduleUpdate = {
								syncMeta: {
									data: data
								}
							};
							break;

						default:
							throw new Error('Unknown module to send.');
					}

					if (instance) {
						instance.callModuleUpdate(moduleUpdate);
					}
				}
			};

			// assign the handler to the global variable
			U.flash.handler = handler;
		}

		return {
			init: init,
			objectPath: objectPath
		};
	}
);
