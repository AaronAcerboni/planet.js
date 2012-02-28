// A module containing functions needed for the server to start.

var runners = require("./runners"),
    fs      = require("fs");

function startRunners(aggLocation) {
  var aggregations = "";
  if(aggLocation)
    aggregations = aggLocation;
  else
    aggregations = "../aggregations.json";

  fs.readFile(aggLocation, function(e, data){
      var all = JSON.parse(data);

      for(i in all){
        var agg = all[i];
        for(j in agg.feeds){
          var feed = agg.feeds[j];
          runners.start[feed.runner.type](feed, agg.name);
        }
      }
  });

}

exports.startRunners = startRunners;