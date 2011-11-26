// A module containing functions needed for the server to start.

var Activities = require("/planet.js/core/activities"),
    fs         = require("fs");

// ### startActivties
// > Starts up [activities](Activities.html) based on what aggregations are defined
// > in `aggregations.json`.
// >  
// > Parameters :
// >  
// > - `aggLocation` : Location of `aggregations.json` file (optional)
function startActivities(aggLocation) {

  if(aggLocation != undefined)
    var aggregations = aggLocation;
  else
    var aggregations = "/planet.js/aggregations.json";

  fs.readFile(aggLocation, function(err, data){
      var all = JSON.parse(data);

      for(i in all){
        var agg = all[i];
        for(j in agg.feeds){
          var feed = agg.feeds[j];
          switch(feed.activity.type){
            case "poller" :
              Activities.startPoller(feed, agg.name); break;
            case "subscriber" :
              Activities.startSubscriber(feed, agg.name);
          }
        }
      }
  });

}

exports.startActivities = startActivities;