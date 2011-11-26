/*
  A native process module used for getting & mapping RSS data
  to the storage schema.
*/

var Fetcher = require("/planet.js/core/fetch"),
    Parser = require("/planet.js/core/parser");

var store;

function main(resources, callback) {
  store = callback;
  Fetcher.get(resources.url, parseRSStoJSON);
}

// Parse RSS xml to JSON
function parseRSStoJSON(err, data) {
  if(err) throw err;
  Parser.parse(data, "json", mapRSStoCommon);
}

// Map the RSS feed data to a structure matching the storage schema
function mapRSStoCommon(json) {
  var channelLink = json.channel.link,
      channelTitle = json.channel.title,
      channelImg = undefined,
      entries = [];

  try {
    channelImg = json.channel.image.url;
  } catch (e) {
    /* couldn't find an image in this rss */
  }

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
        main_image : channelImg
      }
    });
  };

  store(entries);
}

exports.main = main;