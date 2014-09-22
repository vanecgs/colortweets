<?php 
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

	require_once('../twitter-api-php-master/TwitterAPIExchange.php');

	$settings = array(
	    'oauth_access_token' => "YOURTOKEN",
	    'oauth_access_token_secret' => "YOURTOKENSECRET",
	    'consumer_key' => "YOURCONSUMERKEY",
	    'consumer_secret' => "YOUR CONSUMER SECRET"
	);

	$url = 'https://api.twitter.com/1.1/search/tweets.json';
	$getfield = '?q=color';
	$requestMethod = 'GET';

	$twitter = new TwitterAPIExchange($settings);
	$tweets = json_decode($twitter->setGetfield($getfield)
				->buildOauth($url, $requestMethod)
	            ->performRequest());
	echo json_encode($tweets->statuses);

?>