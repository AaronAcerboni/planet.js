/*
  Module for routing pathnames sent over HTTP and assigning them to methods.
*/

var handlers = require('/planet.js/core/methods'),
    url = require('url');

function route(request, methods) {
  var path = url.parse(request.url).pathname,
      verb = request.method.toLowerCase();

  // Path finding

  var dirs = path.split("/").slice(1);

  if(dirs.length == 1){
    // should be "" or "feeds"
    if(dirs[0] == "feeds" || dirs[0] == ""){
      console.log("return primary page");
    }
  } else if(dirs.length == 2 && dirs[0] == "feeds"){
    // match dir[1] with existing aggregation sets
    console.log("returns existing aggregation set");
  }

  return {
    responseCode : "404",
    mimeType :  {"Content-Type": "text/plain"},
    data : "planet.js doesn't route yet, but here is your path: " + path
  };

}

function pathInvalid(){
  return {
    responseCode : "404",
    mimeType :  {"Content-Type": "text/plain"},
    data : "404 Resource not found"
  };  
}

exports.route = route;