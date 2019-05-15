require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=af8c5bbd

// Bands in town api: 6df351fd-4f57-407f-90ff-571e6c4aada7

// Make it so liri.js can take in one of the following commands:

var command = process.argv[2];
var parameter = process.argv[3];


switch(command) {
    case 'concert-this':
    bandsInTown(parameter);
    break;

    case 'spotify-this-song':
    spotifyThisSong(parameter);
    break;

    case 'movie-this':
    movieThis(parameter);
    break;

    case 'do-what-it-says':
    doWhatItSays(parameter);
    break;


}

function bandsInTown(){
//     This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
axios
    .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=6df351fd-4f57-407f-90ff-571e6c4aada7")
    .then(function(response){
        console.log(response.data);
            // Name of the venue
            // Venue location
            // Date of the Event (use moment to format this as "MM/DD/YYYY")
       
    })

}

function spotifyThisSong(){
//     This will show the following information about the song in your terminal/bash window

// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.

// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

// The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

// Step One: Visit https://developer.spotify.com/my-applications/#!/

// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
}

function movieThis(){
//     This will output the following information to your terminal/bash window:
axios
    .get("http://www.omdbapi.com/?t=" + parameter + "&apikey=af8c5bbd")
    .then(function(response){
        console.log(response.data);
        
    })
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!

// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
}

function doWhatItSays(){
//     Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

// Edit the text in random.txt to test out the feature for movie-this and concert-this.
}

// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

// Make sure you append each command you run to the log.txt file.

// Do not overwrite your file each time you run a command.
