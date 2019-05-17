require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=af8c5bbd

// Bands in town api: 6df351fd-4f57-407f-90ff-571e6c4aada7

var command = process.argv[2];
var parameter = process.argv[3];
console.log(command);
console.log(parameter);


var choice = function(command, parameter) {
    switch(command) {
        case 'concert-this':
        bandsInTown(parameter);
        console.log("band parameter: " + parameter);
        break;

        case 'spotify-this-song':
        spotifyThisSong(parameter);
        console.log("song parameter: " + parameter)
        break;

        case 'movie-this':
        movieThis(parameter);
        console.log("movie parameter: " + parameter)
        break;

        case 'do-what-it-says':
        doWhatItSays(parameter);
        console.log("do parameter: " + parameter)
        break;

        default:
        console.log('LIRI does not know that command! Try Again!');
        console.log('Try One of These Commands:');
        console.log('concert-this \nspotify-this-song \nmovie-this \ndo-what-it-says')
        }
}
var userCommand = function(command, parameter) {
    choice(command, parameter);
}
userCommand(command, parameter);

function bandsInTown(artist){

var bandsQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=6df351fd-4f57-407f-90ff-571e6c4aada7"
axios
    .get(bandsQueryURL)
    .then(function(response){
        
        // console.log(response);
        var dataLength = response.data.length;
        for (let i = 0; i < dataLength; i++) {
            console.log([i]);
            console.log("Venue Name: " + response.data[i].venue.name +
                        "\nVenue Location: " + response.data[i].venue.city +
                        "\nEvent Date: " + moment(response.data[i].datetime).format('L'));  
            console.log("----------------------------------------\n");
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
    var searchSong = "the sign ace of base"
    console.log("if: " + searchSong);
}else {
    var searchSong = songTitle;
    console.log("Else: " + searchSong);
}
spotify
  .search({ 
      type: 'track', 
      query: searchSong })
  .then(function(response) {
      var songs = response.tracks.items;
      for (let i = 0; i < songs.length; i++){
        console.log([i]);
        console.log("Artist: " + songs[i].artists[0].name +
                    "\nSong: " + songs[i].name +
                    "\nAlbum: " + songs[i].album.name +
                    "\nPreview: " + songs[i].preview_url);
        console.log("----------------------------------------\n");
        }
  })
  .catch(function(err) {
    console.log(err);
  });

}

function movieThis(movie){
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (movie === undefined) {
        var searchMovie = "Mr. Nobody"
        console.log("if: " + searchMovie);
    }else {
        var searchMovie = movie;
        console.log("Else: " + searchMovie);
    }


axios
    .get("http://www.omdbapi.com/?t=" + searchMovie + "&apikey=af8c5bbd")
    .then(function(response){
        // console.log(response.data);
        console.log("--------------------------------------");            
        //   * Title of the movie.
        console.log("Title: " + response.data.Title);
        //   * Year the movie came out.
        console.log("Year: " + response.data.Year);
        //   * IMDB Rating of the movie.
        console.log("Rated: " + response.data.Rated);
        //   * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        //   * Country where the movie was produced.
        console.log("Country: " + response.data.Country);
        //   * Language of the movie.
        console.log("Language: "+ response.data.Language);
        //   * Actors in the movie.
        console.log("Actors: " + response.data.Actors);
        //   * Plot of the movie.
        console.log("Plot: " + response.data.Plot);
        console.log("--------------------------------------"); 
    })
    .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
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
