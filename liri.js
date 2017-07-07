//Spotify Developer Client ID: 491ef369bfa14aef8f3b1fb2e1e409de
//Spotify Developer Client Secret: 5352573b8a3643379818e9501504a2c7

//Node packages: Twitter, Spotify, Request, 
//API: OMDB

var fs = require("fs");
var request = require("request");
var twitter = require("node-twitter-api");
var spotify = require("node-spotify-api");
var omdb = require("omdb");



fs.readFile("keys.js", "utf-8", function(err,data) {
	if (err) {
		return console.log(err);
	}

var command1 = process.argv[2];
var command2 = process.argv.slice(3, process.argv.length);

switch (command1) {
	case "my-tweets":
		console.log("My tweets!");
		//Get consumer key from keys.js
		var consumerKey = fs.readFile("keys.js/exports.twitterKeys.consumer_key");
		//Get token key from keys.js
		var tokenKey = fs.readFile("keys.js/exports.twitterKeys.access_token_key");
		//make a request to the API
		request("https://accounts.spotify.com/authorize/?client_id=" + 491ef369bfa14aef8f3b1fb2e1e409de + "&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09", function (err, response, body) {
			if (!error && response.statuscode == 200) {
				var info = JSON.parse(body);
			} else {
				console.log("No spotify data available.");
			}
		})
		//Show your last 20 tweets and when they were created in terminal
		//Make a call to the API to grab the request information
		break;

	case "spotify-this-song":
		console.log("Spotify this song!");
		spotify.search({ type: 'track', query: request }, function(err,data){
			if (err) {
				return console.log("Error occurred: " + err);
			}
			console.log(data);
		});
		//Show the following information:
		//Artist(s)
		//Song Name (default "The Sign" by Ace of Base)
		//Preview link from the song on Spotify
		//Album the song is from

		break;

	case "movie-this":
		console.log("Movie this!");
		//Search function and pass err and movies as the two parameters.
		omdb.search(request, function(err, movies) {
			//To return error messages:
			if (err) {
				return console.log(err);
			}
			if (movies.length < 1) {
				return console.log("No movies were found!");
			}
			//Function for retrieving movie data.
			movies.forEach(function(movie) {
				console.log(movie.title)
			});
		})
		break;

	case "do-what-it-says":
		console.log("Do what it says!");
		break;

}

});