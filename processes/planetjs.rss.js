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
        entries = [];

    if(json.channel.image){
      if(json.channel.image.url) channelImg = json.channel.image.url;
    }

    for (var i = 0; i < json.channel.item.length; i++) {

      entries.push({
        date : new Date(json.channel.item[i].pubDate),
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

    nextProcess(entries);
  }

}

exports.main = main;