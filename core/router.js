var methods = require('/planet.js/core/methods'),
    url = require('url');

function route(request, response) {

  var path = url.parse(request.url).pathname,
      verb = request.method,
      type = request.headers["content-type"],
      tokens = path.split("/");

  // Was verb specified or does the system support it
  if(typeof methods[verb] == "function"){

    // Path finding
    console.log(tokens);
    if (path.match("^/$")){

      methods[verb] ("feeds", null, null, type, response);

    } else if (path.match("^/[a-zA-Z]*/*$")){
      
      methods[verb] (tokens[1], null, null, type, response);

    } else if (path.match("^/[a-zA-Z]*/[0-9]{4}/*$")){

      methods[verb] (tokens[1], tokens[2], null, type, response);

    } else if (path.match("^/[a-zA-Z]*/[0-9]{4}/(0[1-9]|1[012])/*$")){

      methods[verb] (tokens[1], tokens[2], tokens[3], type, response);

    } else {
      methods.resourceNotFound(response, path);
    }

  } else {
    methods.unsupportedVerb(response, verb);
  }

}

exports.route = route;