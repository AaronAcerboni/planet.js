/*
  Module for retrieving data. 

  Supports HTTP
*/

var http  = require('http');

function httpGET(url, callback) {

  // Validate URL and split it up by hostname and path
  // It's ok with both http:// prepending or without
  // Doesn't account for port numbers yet

  var urlParts = url.split('/');
  var start = 3;

  if (url.indexOf('http') == -1) { // if url does not start with http
    start = 1;
  }

  var path = '';
  for(var i = start; i < urlParts.length; i++){
    path += '/' + urlParts[i];
  }

  // Go get the resource

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
      callback(raw, undefined);
    })
  }).on('error', function(e) {
    callback(undefined, e)
  });
  
}

// * Interface


exports.fetch = httpGET;