// Server houses the main HTTP listener and also uses the Init module starting up 
// activities which loop the aggregation process.

var init       = require('/planet.js/core/init'),
    router     = require('/planet.js/core/router'),
    methods    = require('/planet.js/core/methods'),
    http       = require('http');

// ### Server initialization
// Utilizes the init module

init.startActivities("/planet.js/aggregations.json");

// ### HTTP listening loop
// Utilizes the router module

http.createServer(function(req, res){
  
  var content = router.route(req, methods);
  res.writeHead(content.responseCode, content.mimeType);
  res.end(content.data);

}).listen(8888);