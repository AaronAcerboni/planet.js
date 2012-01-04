/*
  A native process module used for getting & mapping RSS data
  to the storage schema.
*/

var Fetcher = require("/planet.js/core/fetch").Fetcher,
    Parser = require("/planet.js/core/parser").Parser;

var store;

function main(resources, callback) {
  store = callback;
  var fetcher = new Fetcher();
  fetcher.get(resources.url, parseRSStoJSON);
}

// Parse RSS xml to JSON
function parseRSStoJSON(err, data) {
  var parser = new Parser();
  parser.parse(data, "application/rss+xml", "application/json", mapRSStoCommon);
}

// Map the RSS feed data to a structure matching the storage schema
function mapRSStoCommon(json) {
  var channelLink = json.channel.link,
      channelTitle = json.channel.title,
      channelImg = null,
      entries = [];

  if(json.channel.image) channelImg = json.channel.image;

  for (var i = 0; i < json.channel.item.length; i++) {
    entries.push({
      date : json.channel.item[i].pubDate,
      source_link : channelLink,
      data : {
        title : json.channel.item[i].title,
        author : channelTitle,
        text_summary : json.channel.item[i].description.substring(0,140) + "...",
        text_full : json.channel.item[i].description,
        link : json.channel.item[i].link,
        main_image : channelImg,
        location : null
      }
    });
  };

  store(entries);
}

exports.main = main;