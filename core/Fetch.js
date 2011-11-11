// Module for retrieving data. Currently supports :
//
// - HTTP

var http  = require('http');

// ## fetch
// >  
// > A function which makes a GET request and passes the response to the callback.
// > 
// > Parameters :  
// >  
// > - `url` : a string url.
// > - `callback` : passes back the requested data or an Error.

function fetch(url, callback) {

  // Validate URL and split it up by hostname and path.
  // It's ok with both `http://` prepending or without.
  // **Doesn't** account for port numbers yet.

  var urlParts = url.split('/');
  var start = 3;

  if (url.indexOf('http') == -1) { // if url does not start with http
    start = 1;
  }

  var path = '';
  for(var i = start; i < urlParts.length; i++){
    path += '/' + urlParts[i];
  }

  // Go and get the resource using Node `http`.
  // Pass optional error and data to callback.

  var options = {
    host: urlParts[start-1],
    port: 80,
    path: path
  };

  http.get(options, function(res) {
    console.log ( "-STARTING");
    res.setEncoding('utf8');
    var raw = "";
    res.on('data', function(chunk) {
      console.log(" += CHUNK");
      raw += chunk;
    })
    res.on('end',function() {
      console.log("-END");
      callback(undefined, raw);
    })
  }).on('error', function(e) {
    callback(e, undefined)
  });
  
}


exports.fetch = fetch;