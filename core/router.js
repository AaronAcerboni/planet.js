/*
  Module for routing pathnames sent over HTTP and assigning them to methods.
*/

var methods = require('/planet.js/core/methods'),
    url = require('url');

function route(request, response) {

  var path = url.parse(request.url).pathname,
      verb = request.method,
      type = request.headers["content-type"];

  // Was verb specified or does the system support it
  if(typeof methods[verb] == "function"){

    // Path finding

    if (path.match("^/$|^/feeds$")){
      methods[verb](null, null, type, response); 
    } else if (path.match("^/feeds/")){
      methods[verb](null, path.split("/")[2], type, response);
    } else {
      methods[verb](path.split("/")[1], path.split("/")[2], type, response);
    }

  } else {
    // No http verb specified.
  }

}

exports.route = route;