<?php

use OAuth\Common\Http\Uri\UriFactory;

require_once __DIR__ . '/vendor/autoload.php';

// Uri helper
if (isset($_GET['callback_uri'])) {
	$callbackUri = $_GET['callback_uri'];
} else {
	$uriFactory = new UriFactory();
	$currentUri = $uriFactory->createFromSuperGlobalArray($_SERVER);
	$currentUri->setQuery('');

	$callbackUri = $currentUri->__toString();
	$callbackUri = preg_replace('|/[^/]*$|', '/', $currentUri);
}

// Authentication informations
define('CLIENT_SECRET',       '37076380384B645B59F55AB375373404A36140A2');
define('CLIENT_ID',           '000000000000000000000000000173166617D402');
define('CLIENT_CALLBACK_URI', $callbackUri);
