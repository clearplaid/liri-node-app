# LIRI Bot
## Overview
LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## User Instructions
liri.js can take in one of the following commands:

* ### concert-this
  * node liri.js concert-this <artist/band name here>
  * This will search the Bands in Town Artist Events API for an artist 
  * This will then append the following information about the events to a text file: 
    * Name of the venue
    * Venue location
    * Date of the Event (LIRI uses moment to format this as "MM/DD/YYYY")
  * LIRI will console log confirmation to the terminal/bash window  
![Image of Concert-this]
(https://github.com/clearplaid/liri-node-app/tree/master/images/concert-this-results-no-arg.png){:class="img-responsive"}
* ### spotify-this-song
  * node liri.js spotify-this-song '<song name here>'
  * This will search 
  * This will then append the following information about the song to a text file: 
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
  * If no song is provided then LIRI will default to "The Sign" by Ace of Base.
  * LIRI will console log confirmation to the terminal/bash window  
  
* ### movie-this
  * node liri.js movie-this '<movie name here>'
  * This will then append the following information about the movie to a text file: 
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Actors in the movie.
    * Plot of the movie.
  * If the user doesn't type a movie in, LIRI will output data for the movie 'Mr. Nobody.' 
  * LIRI will console log confirmation to the terminal/bash window  
  
* ### do-what-it-says
  * node liri.js do-what-it-says
  * Using the line-reader Node package, LIRI will take each line of text inside of random.txt and then use it to call each of LIRI's commands that are requested.
  
