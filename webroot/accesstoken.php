<?php

use OAuth\Common\Storage\Session;
use OAuth\Common\Consumer\Credentials;

ini_set('html_errors', false);

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../api_config.php';

// Session storage
$storage = new Session();

// Service factory
$serviceFactory = new \OAuth\ServiceFactory();

// Setup some basic configuration stuffs
$serviceName = 'Ustream';

$credentials = new Credentials(CLIENT_ID, CLIENT_SECRET, CLIENT_CALLBACK_URI);

$scopes = array('broadcaster');

// Create the Ustream API Service class
$ustreamService = $serviceFactory->createService(
	$serviceName,
	$credentials,
	$storage,
	$scopes
);

// Setup the response object
$response = new stdClass();
$response->error        = false;
$response->accessToken  = null;
$response->expiresIn    = 0;

// Is the request came as AJAX?
$isAjaxRequest = !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
	&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if (!$storage->hasAccessToken($serviceName)) {
	$code = isset($_GET['code']) ? $_GET['code'] : false;

	if ($code) {
		$token = $ustreamService->requestAccessToken($code);

		$response->accessToken = $token->getAccessToken();
		$response->expiresIn   = $token->getEndOfLife();

		if (!$response->accessToken) {
			$response->error = 'noAccessToken';
		}
	} else {
		$url = $ustreamService->getAuthorizationUri();

		if($isAjaxRequest) {
			$response->error   = 'needAuthorization';
			$response->authUrl = $url->__toString();
		} else {
			header('Location: ' . $url);
			exit;
		}
	}
} else {
	$token = $storage->retrieveAccessToken($serviceName);
	$response->accessToken = $token->getAccessToken();
	$response->expiresIn   = $token->getEndOfLife();
}

header('Content-Type: application/json');
echo json_encode($response);
