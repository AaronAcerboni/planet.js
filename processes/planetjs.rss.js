/*
  A native process module used for getting & mapping RSS data
  to the storage schema.
*/

var Fetcher = require("../core/fetch").Fetcher,
    Parser  = require("../core/parser").Parser

function main(options, nextProcess) {
  var fetcher = new Fetcher();

  fetcher.get(options.resources.url, parseRSStoJSON);

  function parseRSStoJSON(data) {
    (new Parser).parse(data, "application/rss+xml", "application/json", mapRSStoCommon);
  }

  function mapRSStoCommon(json) {
    var channelLink = json.channel.link,
        channelTitle = json.channel.title,
        channelImg = null,
        itemDate = null,
        entries = [];

    if(json.channel.image){
      if(json.channel.image.url) channelImg = json.channel.image.url;
    }

    for (var i = 0; i < json.channel.item.length; i++) {

      // Add date cautiously
      if(json.channel.item[i].pubDate){
        itemDate = new Date(json.channel.item[i].pubDate);
      } else {
        itemDate = 'Unknown';
      }

      entries.push({
        date : itemDate,
        source_name : channelTitle,
        source_link : channelLink,
        data : {
          title : json.channel.item[i].title,
          author_name : channelTitle,
          author_id : null,
          text_summary : json.channel.item[i].description.substring(0,240) + "...",
          text_full : json.channel.item[i].description,
          link : json.channel.item[i].link,
          main_image : channelImg,
          location : null
        }
      });
    };

    // Apply the latest build date to the latest entry if its unknown.
    // This is to ensure that if a feed doesn't publish dates for all
    // articles then, by continous collection, this data would eventually
    // build up a correctly dated aggregation one item at a time.
    // Past items will still remain with Unknown dates however.
    if(entries[0].date == "Unknown"){
      if(json.channel.lastBuildDate){
        entries[0].date = new Date(json.channel.lastBuildDate);
      }
    }
    nextProcess(entries);
  }

}

exports.main = main;