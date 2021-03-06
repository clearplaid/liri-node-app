require("dotenv").config();

var fs = require("fs");
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var lineReader = require("line-reader");

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

        case 'make-it-so':
        makeItSo(parameter);
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
        fs.appendFile("log.txt", "\nArtist: " + searchArtist + '\n', function(err) {
            if (err) throw(err)
        });
    axios
        .get("https://rest.bandsintown.com/artists/" + searchArtist + "/events?app_id=6df351fd-4f57-407f-90ff-571e6c4aada7")
        .then(function(response){
            var divider = "\n------------------Event Info---------------------\n";
                        
            var artistInfo = response.data;
                console.log("Artist: " + searchArtist);

            for (let i = 0; i < artistInfo.length; i++) {               
                console.log(divider);
                console.log([i + 1]);
                console.log("\nVenue Name: " + artistInfo[i].venue.name +
                            "\nVenue Location: " + artistInfo[i].venue.city +
                            "\nEvent Date: " + moment(artistInfo[i].datetime).format('L'));  

                fs.appendFile("log.txt", divider +
                                '\n' + [i + 1] + 
                                '\nVenue Name: ' + artistInfo[i].venue.name + 
                                '\nVenue Location: ' + artistInfo[i].venue.city + 
                                '\nEvent Date: ' + moment(artistInfo[i].datetime).format('L'), 
                            function(err) {
                                if (err) throw(err);        
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
    var divider = "\n------------------Song Info---------------------\n";
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
            console.log(divider);
            console.log([i + 1]);
            console.log("Artist: " + songs[i].artists[0].name +
                        "\nSong: " + songs[i].name +
                        "\nAlbum: " + songs[i].album.name +
                        "\nPreview: " + songs[i].preview_url);

            fs.appendFile("log.txt", divider +
                            "\n" + [i + 1] + 
                            "\nArtist: " + songs[i].artists[0].name +
                            "\nSong: " + songs[i].name +
                            "\nAlbum: " + songs[i].album.name +
                            "\nPreview: " + songs[i].preview_url, 
                        function(err) {
                            if (err) throw(err);             
            });
        }
    })
    .catch(function(err) {
        console.log(err);
    });

}

function movieThis(movie){
    var divider = "\n------------------Movie Info---------------------\n";
    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (movie === undefined) {
        var searchMovie = "Mr. Nobody"; 
    }else {
        var searchMovie = movie;
    }


    axios
        .get("http://www.omdbapi.com/?t=" + searchMovie + "&apikey=af8c5bbd")
        .then(function(response){
            if (!response.data.Ratings[1].Value) {
                var rottenExists = "N/A";
            }else {
                var rottenExists = response.data.Ratings[1].Value;;
            }

            console.log(divider + 
                        "\nTitle: " + response.data.Title +
                        "\nYear: " + response.data.Year +
                        "\nRated: " + response.data.Rated +
                        "\nRotten Tomatoes: " + rottenExists +
                        "\nCountry: " + response.data.Country +
                        "\nLanguage: "+ response.data.Language +
                        "\nActors: " + response.data.Actors +
                        "\nPlot: " + response.data.Plot);

            fs.appendFile("log.txt", divider + 
                            "\nTitle: " + response.data.Title +
                            "\nYear: " + response.data.Year +
                            "\nRated: " + response.data.Rated +
                            "\nRotten Tomatoes: " + rottenExists +
                            "\nCountry: " + response.data.Country +
                            "\nLanguage: "+ response.data.Language +
                            "\nActors: " + response.data.Actors +
                            "\nPlot: " + response.data.Plot, 
                        function(err) {
                            if (err) throw(err);
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

function makeItSo(){
    lineReader.eachLine('random.txt', 'utf8', function(line) {

        var lineArr = line.split(', ');

        if (lineArr.length == 2) {
            choice(lineArr[0], lineArr[1]);
        }else if (lineArr.length == 1) {
            choice(lineArr[0]);
        }
    })   
    // Using the fs Node package, LIRI will take the text inside of random.txt 
    // and then use it to call one of LIRI's commands.
    // fs.readFile('random.txt', 'utf8', function (err, data) {
    //         if (err) {
    //             throw err;
    //         }
    //         var dataArr = data.split(', ');
    //         console.log("Data: " + dataArr);
    //         if (dataArr.length == 2) {
    //             choice(dataArr[0], dataArr[1]);
    //         }else if (dataArr.length == 1) {
    //             choice(dataArr[0]);
    //         };
    //     });
         // read all lines from random.txt: 
       
}
