var fs = require("fs");

fs.readFile("keys.js", "utf-8", function(err,data) {
	if (err) {
		return console.log(err);
	}
})


var command = process.argv[2];

switch (command) {
	case "my-tweets":
		console.log("My tweets!");
		//Show your last 20 tweets and when they were created in terminal
		break;

	case "spotify-this-song":
		console.log("Spotify this song!");
		//Show the following information:
		//Artist(s)
		//Song Name (default "The Sign" by Ace of Base)
		//Preview link from the song on Spotify
		//Album the song is from
		break;

	case "movie-this":
		console.log("Movie this!");
		break;

	case "do-what-it-says":
		console.log("Do what it says!");
		break;

}