var fs = require("fs");
var request = require("request");
var twitter = require("node-twitter-api");
var spotify = require("node-spotify-api");
var omdb = require("omdb");
var keysFile = require("./keys.js");
var command1 = process.argv[2];
var command2 = process.argv.slice(3, process.argv.length);
command2 = command2.join(" ");

//Twitter access
var twitterConsumer = keysFile.twitterKeys.consumer_key;
var twitterAccess = keysFile.twitterKeys.access_token_key;
var twitterSecret = keysFile.twitterKeys.access_token_secret;

//Spotify access
var spotifyClient = keysFile.spotifyKeys.client_id;
var spotifySecret = keysFile.spotifyKeys.client_secret;

//OMDB access
var omdbApiKey = keysFile.omdbKeys.api_key;

	switch (command1) {
		//Twitter request
		case "my-tweets":
			//This request needs to access my access key to retrieve data from my twitter account.
			//Show my last 20 tweets and ***WHEN THEY WERE CREATED*** in terminal
			request("https://api.twitter.com/1.1/search/tweets.json?q=%23@alex_cota&since_id=45&max_id=100&count=20", function (err, data) {
				if (err || data.statuscode !== 200) {
					return console.log("No tweets available."+ err);
				} else if (!err && data.statuscode == 200) {
					console.log(data);
				};
			});
		break;

		//Spotify request
		case "spotify-this-song":
			request("https://accounts.spotify.com/authorize/?client_id=" + spotifyClient + "&response_type=code&redirect-url=http://google.com/search&q=" + command2 + "&type=song", function(err, data) {
				if (err) {
					return console.log("Error occurred: " + err);
				} else if (!err && data.statuscode === 200) {
					console.log(data);
				}
				
			});
			//Show the following information:
			//Artist(s)
			//Song Name (default "The Sign" by Ace of Base)
			//Preview link from the song on Spotify
			//Album the song is from

			break;

		//Omdb request.	
		// case "movie-this":
		
		// 	if (command2 !== "") {
		// 		request("http://www.omdbapi.com/?t=" + command2 + "&y=&r=&tomatoes=&plot=short&apikey=40e9cece", function(err, response, body) {
		// 			console.log(response);
		// 			console.log(body);
		// 			console.log(err);
		// 			if (err) {
		// 				return console.log("No movies for you!" + err);
		// 			} else if (!err && body.statuscode === 200) {
		// 				console.log(body);
		// 			}
		// 		})
		// 			} else if (command2 === "") {
		// 				request("http://www.omdbapi.com/?t=Mr.Nobody&y=&r=&tomatoes=&plot=short&apikey=40e9cece"), function(err, data) {
		// 					console.log(data);
		// 			}
		// 		}
			
		// break;

		//LIRI will use command in random.txt to run command.
		case "do-what-it-says":
		fs.readFile("random.txt", "utf-8", function(err, response){
			console.log(response);
		});

		break;

		}

	// });




