var sys        = require('sys'),
    u          = require('util'),
    fs         = require('fs'),
    http       = require('http'),
    Activities = require('/planet.js/core/Activities');


// Start main loop

http.createServer(function(request, response) {
  
}).listen(8888);

// Server init

// Start up consumer activities, they fetch data based on aggregations.json
readConfig();
function readConfig(){
  fs.readFile("aggregations.json", function(err, data){
    if(err){
      throw err;
    } else {

      var all = JSON.parse(data);

      for(i in all){
        var agg = all[i];
        for(j in agg.feeds){
          // For each feed in aggregations.json start up a polling object
          var feed = agg.feeds[j];
          if( feed.collection.type == "poll"){
            Activities.startPoller(feed, agg.name);
          }
          if( feed.collection.type == "pushed"){
            // Activities ...
          }
        }
      }
      console.log("server.js > " + Activities.all.length + " Consumer objects created.");
    } 
  });
}