var methods = require('/planet.js/core/methods'),
    url = require('url');

function route(request, response) {

  var path = url.parse(request.url).pathname,
      verb = request.method.toLowerCase(),
      type = request.headers["content-type"],
      tokens = path.split("/");

  // If method is supported
  if(!methods[verb]){

    methods.unsupportedVerb(response, verb);

  } else if(path.match("^/$") || path.match("^/feeds*/*$")){
    
    methods[verb]["feeds"] (type, response, "all");

  } else if(methods[verb][tokens[1]]){
    
    methods[verb][tokens[1]] (type, response, tokens[2], tokens[3], tokens[4]);

  } else {
    
    methods.resourceNotFound(response, tokens[1]);

  }

}

exports.route = route;