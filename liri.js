require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=af8c5bbd

// Bands in town api: 6df351fd-4f57-407f-90ff-571e6c4aada7

// Make it so liri.js can take in one of the following commands:

// concert-this

// spotify-this-song

// movie-this

// do-what-it-says