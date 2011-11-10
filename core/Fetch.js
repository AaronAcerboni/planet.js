// Module for retrieving data.
// Supports :
// - HTTP

var http  = require('http');

// # httpGET
// A function which makes a GET request and passes the response to the callback.
// Parameters :
// - `url` , a string url.
// - `callback` , passed back the requested data or an Error.

function httpGET(url, callback) {

  /* Validate URL and split it up by hostname and path
     It's ok with both http:// prepending or without
     Doesn't account for port numbers yet */

  var urlParts = url.split('/');
  var start = 3;

  if (url.indexOf('http') == -1) { // if url does not start with http
    start = 1;
  }

  var path = '';
  for(var i = start; i < urlParts.length; i++){
    path += '/' + urlParts[i];
  }

  /* Go get the resource */

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

// # Interface

exports.fetch = httpGET;