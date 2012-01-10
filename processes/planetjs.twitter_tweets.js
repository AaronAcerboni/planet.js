/*
  A native process module used for getting & mapping tweets
  to the storage schema.
*/

var Twitter = require('twitter-node').TwitterNode;

var store,
    tw;

function main(resources, callback) {
  store = callback;
  tw = new Twitter({
    user : resources.username,
    password : resources.userpass,
    follow : resources.follow
  });
  listen();
}

function listen(){
  tw.addListener('Error', function(err){
    console.log( err.message );
  })
  .addListener('tweet', function(tweet){
    console.log("A new tweet entry has been recieved.");
    mapTweetToCommon(tweet);
  })
  .stream();
}

function mapTweetToCommon(tweet){
  var entry = {};
  
  // Explore : Twitter's rich meta data in relation to planet.js schema
  
  entry.date = new Date(tweet.created_at);
  entry.source_link = "http://twitter.com";

  entry.data = {
    title : null,
    author_name : "@" + tweet.user.screen_name,
    author_id : tweet.user.id_str,
    link : "https://twitter.com/#!/" + tweet.user.screen_name + "/status/" + tweet.id_str,
    text_summary : tweet.text,
    text_full : tweet.text,
    main_image : tweet.user.profile_image_url_https
  };

  // If tweet.place exists apply it to the schema location field

  if(tweet.place){
    entry.data.location = tweet.place.full_name;
  } else {
    entry.data.location = null;
  }

  store(entry);
}

exports.main = main;