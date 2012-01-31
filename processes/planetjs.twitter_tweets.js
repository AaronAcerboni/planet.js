/*
  A native process module used for getting & mapping tweets
  to the storage schema.
*/

var Twitter = require('twitter-node').TwitterNode
    next    = null,
    tw      = null;

function main(options, nextProcess) {

  next = nextProcess;

  tw = new Twitter({
    user : options.resources.username,
    password : options.resources.userpass,
    follow : options.resources.follow
  })
  .addListener('Error', function(e){
    console.log("process: twitter error : " + e.message);
  })
  .addListener('tweet', function(tweet){
    console.log("process: Grabbed a tweet!")
    mapTweetToCommon(tweet);
  })
  .stream();
}

function mapTweetToCommon(tweet){
  var entry = {};
  
  // Explore : Twitter's rich meta data in relation to the planet.js schema
  
  entry.date = new Date(tweet.created_at);
  entry.source_link = "http://twitter.com/#!/" + tweet.user.screen_name;
  entry.source_name = "@" + tweet.user.screen_name + "on Twitter";

  entry.data = {
    title : "@" + tweet.user.screen_name + " says",
    author : tweet.user.id_str,
    link : "https://twitter.com/#!/" + tweet.user.screen_name + "/status/" + tweet.id_str,
    text_summary : tweet.text,
    text_full : tweet.text,
    main_image : tweet.user.profile_image_url_https
  };
   
  if(tweet.place){
    entry.data.location = tweet.place.full_name;
  } else {
    entry.data.location = null;
  }

  next(entry);
}

exports.main = main;