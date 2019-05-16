require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=af8c5bbd

// Bands in town api: 6df351fd-4f57-407f-90ff-571e6c4aada7

// Make it so liri.js can take in one of the following commands:

var command = process.argv[2];
var parameter = process.argv[3];

var choice = function() {
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
}

function bandsInTown(artist){

var bandsQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=6df351fd-4f57-407f-90ff-571e6c4aada7"
axios
    .get(bandsQueryURL)
    .then(function(response){
        
        // console.log(response);
        var dataLength = response.data.length;
        for (let i = 0; i < dataLength; i++) {
        console.log("\nVenue Name: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nEvent Date: " + moment(response.data[i].datetime).format('L'));  
        }
    })
    .catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

function spotifyThisSong(songTitle){
// need to be able to process.Argv to be a string to read
// If no song is provided then  default to "The Sign" by Ace of Base.
console.log("Before if: " + songTitle)
if (songTitle === undefined) {
    var search = "the sign ace of base"
    console.log("if: " + search);
}else {
    var search = songTitle;
    console.log("Else: " + search);
}
spotify
  .search({ 
      type: 'track', 
      query: search })
  .then(function(response) {
    console.log("\nArtist: " + response.tracks.items[0].artists[0].name +
                "\nSong: " + response.tracks.items[0].name +
                "\nAlbum: " + response.tracks.items[0].album.name +
                "\nPreview: " + response.tracks.items[0].preview_url);
  })
  .catch(function(err) {
    console.log(err);
  });

}

function movieThis(movie){



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
fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            choice(dataArr[0], dataArr[1]);
        }else if (dataArr.length == 1);
    });
}
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

// Edit the text in random.txt to test out the feature for movie-this and concert-this.


// BONUS
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.

// Make sure you append each command you run to the log.txt file.

// Do not overwrite your file each time you run a command.
