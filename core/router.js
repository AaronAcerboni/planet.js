var methods = require('./methods');


function route(request, response){
  var verb     = request.method,
      mime     = request.headers["content-type"],
      tokens   = request.url.substr(1).split("/"),
      resource = tokens[0];

  if(resource == "public"){
    
    methods["public"](response, request.url);

  } else if(request.url.match("^/$")){

    methods["feeds"](response, verb, mime, tokens);

  } else if(methods[resource]){

    methods[resource](response, verb, mime, tokens);

  } else {

    methods.resourceNotFound(response, resource);

  }
}

exports.route = route;