/*
  A native process module used for getting & mapping tweets
  to the storage schema.
*/

var Fetcher = require('/planet.js/core/fetch'),
    Parser = require('/planet.js/core/parser'),
    Twitter = require('twitter-node').TwitterNode;

var store;
var tw;

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
    console.log("HERE!");
    mapTweetToCommon(tweet);
  })
  .stream();
}

function mapTweetToCommon(tweet){
  var entry = {};
  
  // TODO : Explore Twitter entities to populate the other_images schema field

  entry.date = tweet.created_at;
  entry.source_link = "http://twitter.com";
  entry.data = {
    title : "@" + tweet.user.screen_name,
    author : tweet.user.id_str,
    link : "https://twitter.com/#!/" + tweet.user.screen_name + "/status/" + tweet.id,
    text_summary : tweet.text,
    text_full : tweet.text,
    main_image : tweet.user.profile_image_url_https,
    location : tweet.user.location
  };

  store(entry);
}

exports.main = main;