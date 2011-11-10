// where it all begins.

var sys        = require('sys'),
    u          = require('util'),
    fs         = require('fs'),
    http       = require('http'),
    Activities = require('/planet.js/core/Activities');


// ## HTTP listening loop

http.createServer(function(request, response) {
  
}).listen(8888);

// ## Activity initialization
// For each resource found in `aggregations.json` create an associated [activity](Activies.html)

readConfig();

function readConfig() {
  fs.readFile("aggregations.json", function(err, data){
      var all = JSON.parse(data);

      for(i in all){
        var agg = all[i];
        for(j in agg.feeds){
          var feed = agg.feeds[j];
          switch(feed.collection.type){
            case "poll" :
              Activities.startPoller(feed, agg.name);
              break;
            case "pushed" :
              break;
          }
        }
      }
  });
}