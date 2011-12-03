// Server houses the main HTTP listener and also uses the Init module starting up 
// activities which loop the aggregation process.

var fs         = require('fs'),
    http       = require('http'),
    init       = require('/planet.js/core/init');


// ### Server initialization
// Utilizes the init module
init.startActivities("/planet.js/aggregations.json");

// ### HTTP listening loop

http.createServer(function(req, res) {
  
}).listen(8888);
