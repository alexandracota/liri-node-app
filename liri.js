//Node packages: Twitter, Spotify, Request, 
//API: OMDB

var fs = require("fs");
var request = require("request");
var twitter = require("node-twitter-api");
var spotify = require("node-spotify-api");
var omdb = require("omdb");
var keysFile = require("./keys.js");
var command1 = process.argv[2];
var command2 = process.argv.slice(3, process.argv.length);
command2 = command2.join(" ");
console.log(command1);
console.log(command2);

//Twitter access
var twitterConsumer = keysFile.twitterKeys.consumer_key;
var twitterAccess = keysFile.twitterKeys.access_token_key;
var twitterSecret = keysFile.twitterKeys.access_token_secret;

//Spotify access
var spotifyClient = keysFile.spotifyKeys.client_id;
var spotifySecret = keysFile.spotifyKeys.client_secret;

//OMDB access
var omdbApiKey = keysFile.omdbKeys.api_key;



// fs.readFile("keys.js", "utf-8", function(err,data) {
// 	if (err) {
// 		return console.log(err);
// 	}

	switch (command1) {
		//Twitter request
		case "my-tweets":
			request("https://api.twitter.com/1.1/search/tweets.json?q=" + "&since_id=" + "&max_id=" + "&count=20", function (err, data) {
				if (!err && response.statuscode == 200) {
					console.log(data);
				} else if (err) {
					return console.log("No tweets available."+ err);
				} else {
					console.log("Ooops an error occurred!");
				}
			});
			//Show your last 20 tweets and ***WHEN THEY WERE CREATED*** in terminal
		break;

		//Spotify request
		case "spotify-this-song":
			request("https://accounts.spotify.com/authorize/?client_id=" + spotifyClient + "&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09", function(err, data){
				if (!err && response.statuscode === 200) {
					console.log(data);
				} else if (err) {
					return console.log("Error occurred: " + err);
				} else {
					console.log("Oops, something went wrong!");
				}
				
			});
			//Show the following information:
			//Artist(s)
			//Song Name (default "The Sign" by Ace of Base)
			//Preview link from the song on Spotify
			//Album the song is from

			break;

		//Omdb request.	
		case "movie-this":
		
			if (command2 !== "") {
				request("http://www.omdbapi.com/?t=" + command2 + "&y=&r=&tomatoes=&plot=short&apikey=40e9cece", function(err, response, body) {
					console.log(response);
					console.log(body);
					console.log(err);
					if (!err && body.statuscode === 200) {
						console.log(body);
					} else if (err) {
						return console.log("No movies for you!" + err);
					} else {
						console.log("Oops, an error occured!");
					}
				})
					} else if (command2 === "") {
						request("http://www.omdbapi.com/?t=Mr.Nobody&y=&r=&tomatoes=&plot=short&apikey=40e9cece"), function(err, data) {
							console.log(data);
					}
				}
			
		break;

		//LIRI will use command in random.txt to run command.
		case "do-what-it-says":

		break;

		}

	// });




