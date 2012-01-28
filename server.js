// Server houses the main HTTP listener and also uses the Init module starting up 
// activities which loop the aggregation process.

var init       = require('/planet.js/core/init'),
    router     = require('/planet.js/core/router'),
    http       = require('http');

// ### Server initialization
// Used to start runners.

init.startRunners("/planet.js/aggregations.json");

// ### HTTP listening loop
// Utilizes the router module to route http requests

http.createServer(router.route).listen(8888);