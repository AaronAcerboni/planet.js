var mongous = require("mongous").Mongous,
    Parser  = require("/planet.js/core/parser").Parser,
    build   = require("/planet.js/templates/build");

// Methods

var methods = {};

methods.get = function(response, type, resource, parameters){

  var parser = new Parser();

  mongous("test." + resource).find(parameters, function(reply){
    if(reply.documents.length == 0){

      resourceNotFound(response, resource)

    } else if (type == "text/html" || type == undefined){
      
      build.html(resource, reply.documents, function(html){
        OK(response, html, type);
      })

    } else {
      
      Parser.parse(reply.documents, "application/json", type, function(data){
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

// Replies

function OK(response, content, type){
  response.writeHead( 200, {"Content-type" : type});
  response.write(content);
  response.end();
}

function resourceNotFound(response, tokens) {
  response.writeHead( 404, {"Content-type" : "text/plain"});
  response.write("Resource not found:" + tokens);
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

exports.feeds = feeds;

exports.OK = OK;
exports.resourceNotFound = resourceNotFound;
exports.unsupportedMediaType = unsupportedMediaType;
exports.unsupportedVerb = unsupportedVerb;