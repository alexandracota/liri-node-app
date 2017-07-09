var fs = require("fs");
var request = require("request");
//var twitter = require("node-twitter-api");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var omdb = require("omdb");
var keysFile = require("./keys.js");
var command1 = process.argv[2];
var command2 = process.argv.slice(3, process.argv.length);
command2 = command2.join(" ");

//Twitter access
var twitterConsumer = keysFile.twitterKeys.consumer_key;
var twitterConsumerSecret = keysFile.twitterKeys.consumer_secret;
var twitterAccess = keysFile.twitterKeys.access_token_key;
var twitterSecret = keysFile.twitterKeys.access_token_secret;

//Spotify access
var spotifyClient = keysFile.spotifyKeys.client_id;
var spotifySecret = keysFile.spotifyKeys.client_secret;

//OMDB access
var omdbApiKey = keysFile.omdbKeys.api_key;

	switch (command1) {
		// //Twitter request
		case "my-tweets":

			var client = new twitter ({
				consumer_key: twitterConsumer,
				consumer_secret: twitterConsumerSecret,
				access_token_key: twitterAccess,
				access_token_secret: twitterSecret
			});

			client.get('statuses/user_timeline', {q: 'node.js', limit: 20}, function(error, tweets, response) {
				console.log(tweets);
			})

		break;

		//Spotify request
		case "spotify-this-song":
			var newSpotify = new spotify ({
				id: spotifyClient,
				secret: spotifySecret
			});

		if (command2 !== "") {
			newSpotify
				.search({ 
					type: 'track', query: command2})
				.then(function(response) {
					console.log(JSON.stringify(response));
				})
				.catch(function(err) {
					console.log(error);
					});
			} else {
				newSpotify
					.search({
						type: 'track', query: "The Sign Ace of Base"})
					.then(function(response){
						console.log(JSON.stringify(response));
					})
					}

			break;

		//Omdb request.	
		case "movie-this":
		
			if (command2 !== "") {
				request("http://www.omdbapi.com/?t=" + command2 + "&y=&r=&tomatoes=&plot=short&apikey=40e9cece", function(err, response, body) {
					console.log(response);
					console.log(body);
					console.log(err);
					if (err) {
						return console.log("No movies for you!" + err);
					} else if (!err && body.statuscode === 200) {
						console.log(body);
					}
				})
				//If no value is entered, return details for Mr. Nobody.
					} else if (command2 === "") {
						request("http://www.omdbapi.com/?t=Mr.Nobody&y=&r=&tomatoes=&plot=short&apikey=40e9cece", function(err, data) {
							console.log(data);
					})
				}
			
		break;

		//LIRI will use command in random.txt to run command.
		case "do-what-it-says":
		fs.readFile("random.txt", "utf-8", function(err, response){
			console.log(response);
		});

		function getResponse() {
			newSpotify.search({ 
					type: 'track', query: "I want it that way"}, function(err, data) {
					if (err || data.statuscode !== 200) {
						return console.log("Error occurred: " + err);
					} else if (!err && data.statuscode == 200) {
						console.log(data);
					}
				
				})
		};

		break;

		}





