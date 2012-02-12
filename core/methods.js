var mongojs = require("mongojs"),
    Parser  = require("./parser").Parser,
    build   = require("../templates/build"),
    fs      = require("fs");


// Methods

var methods = {};

methods.get = function(response, type, resource, parameters){
  var db = mongojs.connect("test", [resource]);

  db[resource].find(parameters).sort({date : -1}, function(e, docs){
    if(docs.length == 0){

      resourceNotFound(response, resource)

    } else if (type == "text/html" || type == undefined){
      
      build.html(resource, docs, function(html){
        OK(response, html, "text/html");
      })

    } else {
      
      (new Parser()).parse(docs, "application/json", type, function(data){
        if(data){
          OK(response, data, type);
        } else {
          unsupportedMediaType(response, type);
        }
      });

    }
  });

}

methods.put = function(response, type, resource, parameter){
  // ...
}

methods.post = function(response, type, resource, parameter){
  // ...
}

methods.delete = function(response, type, resource, parameter){
  // ...
}

methods.patch = function(response, type, resource, parameter){
  // ...
}

// Resource handlers

function feeds(response, verb, type, tokens) {

  var aggregation = tokens[1],
      year        = tokens[2],
      month       = tokens[3],
      parameters   = {};

  // Package vars for method parameter

  if(aggregation){
    if(aggregation != "all"){
      parameters.aggregation = aggregation;      
    }
  }

  // If specific Year or Month
  if(year && month){

    var start = new Date(parseInt(year), parseInt(month)-1, 1),
        end   = new Date(parseInt(year), parseInt(month)-1, 31);

    parameters.date = { $gte : start, $lt : end };

  } else if(year){

    var start = new Date(parseInt(year), 0, 1),
        end   = new Date(parseInt(year)+1, 0, 1);

    parameters.date = { $gte : start, $lt : end };

  }

  methods[verb.toLowerCase()](response, type, "feeds", parameters);

}

// Public assets handler

function public(response, path) {
  var read = null,
      type = null,
      dir  = path.substr(1).split('/')[1];

  if(dir == 'images'){
    type = 'binary';
  } else {
    read = 'utf-8';
    switch(dir){
      case 'css': type = 'text/css'; break;
      case 'js' : type = 'text/javascript'; break;
    }
  }

  fs.readFile('/planet.js' + path, read, function(e, data){
    if(e){
      if(e.errno == 34){
        resourceNotFound(response, path);
      } else {
        error(response, path);
      }
    } else {
      OK(response, data, type);
    }
  }); 

}

// Replies

function OK(response, content, type){
  response.writeHead( 200, {"Content-type" : type});
  response.write(content);
  response.end();
}

function resourceNotFound(response, path) {
  response.writeHead( 404, {"Content-type" : "text/plain"});
  response.write("Resource not found:" + path);
  response.end();
}

function unsupportedMediaType(response, type) {
  response.writeHead( 415, {"Content-type" : "text/plain"});
  response.write("Unsupported media type: " + type);
  response.end();
}

function unsupportedVerb(response, verb) {
  response.writeHead( 405, {"Content-type" : "text/plain"});
  response.write("Unsupported http verb or no verb supplied: " + verb);
  response.end();
}

function forbidden(response, path) {
  response.writeHead( 403, {"Content-type" : "text/plain"});
  response.write("Forbidden: " + path);
  response.end();
}

function error(response, path) {
  response.writeHead( 500, {"Content-type" : "text/plain"});
  response.write("The server encounter a problem relating to the path: " + path);
  response.end();
}

// Interface

exports.resourceNotFound = resourceNotFound;

exports.feeds = feeds;
exports.public = public;
