//package for reading and writing files
var fs = require("fs");
var Twitter = require("twitter");
var spotify = require("spotify");
var keys = require("./keys.js");
var twitterKeys = keys.twitterKeys;

//arguments (confused?)
var action = process.argv[2];
var value = process.argv[3];


//switch-case statements
switch (action) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        mySpotify();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        command();
        break;
}

// If the "tweets" function is called
function tweets() {

    var client = new Twitter(twitterKeys);

    var params = { screen_name: 'lavidanorita', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

//spotify function 
function mySpotify() {

    var mySearchQuery = process.argv[3];

    spotify.search({ type: "track", query: mySearchQuery }, function(err, data) {
        if (err) {
            console.log("I saw the sign");
            return;
        } else {
            var songInfo = data.tracks.items[0];
            var songResult = console.log(songInfo.artists[0].name)
            console.log(songInfo.name)
            console.log(songInfo.album.name)
            console.log(songInfo.preview_url)
            console.log(songResult);
        };
    });

}


//movie function

function movie() {

	var request = require("request");

    var nodeArgs = process.argv;

    var movieName = "";

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        } else {

            movieName += nodeArgs[i];

        }
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

    // debug against actual URL
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            console.log("Movie: " + movieName);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoes);
        }
    });

}

//do-what-it-says function 
//function command() {


}