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



var choice = function(command, parameter) {
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
    // If no artist is provided then  default to "Pink"
    if (artist === undefined) {
        var searchArtist = "Pink";    
    }else {
        var searchArtist = artist;
    }

    axios
        .get("https://rest.bandsintown.com/artists/" + searchArtist + "/events?app_id=6df351fd-4f57-407f-90ff-571e6c4aada7")
        .then(function(response){
            
            console.log(searchArtist);
            fs.appendFile("log.txt", searchArtist + '\n', function(err) {
                if (err) throw(err);
                    console.log("The artist name has been logged!");    
            })
            var artistInfo = response.data;

            for (let i = 0; i < artistInfo.length; i++) {
                console.log([i]);
                console.log("Venue Name: " + artistInfo[i].venue.name +
                            "\nVenue Location: " + artistInfo[i].venue.city +
                            "\nEvent Date: " + moment(artistInfo[i].datetime).format('L'));  
                console.log("----------------------------------------\n");

                fs.appendFile("log.txt", 
                                '\n' + [i] + 
                                '\nVenue Name: ' + artistInfo[i].venue.name + 
                                '\nVenue Location: ' + artistInfo[i].venue.city + 
                                '\nEvent Date: ' + moment(artistInfo[i].datetime).format('L') + 
                                '\n----------------------------------------\n', 
                            function(err) {
                                if (err) throw(err);
                                console.log("The artist info has been logged!");              
                            });
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
  
    // If no song is provided then  default to "The Sign" by Ace of Base.
    if (songTitle === undefined) {
        var searchSong = "the sign ace of base";    
    }else {
        var searchSong = songTitle;
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

            fs.appendFile("log.txt", 
                            "\n" + [i] + 
                            "\nArtist: " + songs[i].artists[0].name +
                            "\nSong: " + songs[i].name +
                            "\nAlbum: " + songs[i].album.name +
                            "\nPreview: " + songs[i].preview_url + 
                            '\n----------------------------------------\n', 
                        function(err) {
                            if (err) throw(err);
                            console.log("The song info has been logged!");              
            });
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
            if (!response.data.Ratings[1].Value) {
                var rottenExists = "N/A";
            }else {
                var rottenExists = response.data.Ratings[1].Value;;
            }

            console.log("\n--------------------------------------" + 
                        "\nTitle: " + response.data.Title +
                        "\nYear: " + response.data.Year +
                        "\nRated: " + response.data.Rated +
                        "\nRotten Tomatoes: " + rottenExists +
                        "\nCountry: " + response.data.Country +
                        "\nLanguage: "+ response.data.Language +
                        "\nActors: " + response.data.Actors +
                        "\nPlot: " + response.data.Plot +
                        "\n--------------------------------------\n");

            fs.appendFile("log.txt", 
                            "\n--------------------------------------" + 
                            "\nTitle: " + response.data.Title +
                            "\nYear: " + response.data.Year +
                            "\nRated: " + response.data.Rated +
                            "\nRotten Tomatoes: " + rottenExists +
                            "\nCountry: " + response.data.Country +
                            "\nLanguage: "+ response.data.Language +
                            "\nActors: " + response.data.Actors +
                            "\nPlot: " + response.data.Plot +
                            "\n--------------------------------------\n", 
                        function(err) {
                            if (err) throw(err);
                            console.log("The movie info has been logged!");
                        });
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

}

function doWhatItSays(){
    // Using the fs Node package, LIRI will take the text inside of random.txt 
    // and then use it to call one of LIRI's commands.
    fs.readFile('random.txt', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            var dataArr = data.split(', ');
            console.log("Data: " + dataArr);
            if (dataArr.length == 2) {
                choice(dataArr[0], dataArr[1]);
            }else if (dataArr.length == 1) {
                choice(dataArr[0]);
            };
        });
}
