var mongous = require("mongous").Mongous,
    Parser  = require("/planet.js/core/parser").Parser,
    build   = require("/planet.js/templates/build");

// Resource methods

function feeds(verb, type, response, aggregation, year, month) {

  var parser = new Parser(),
      search = {};

  // Prepare search criteria ...

  if(typeof aggregation == "string" && aggregation != "feeds"){
    search.aggregation = aggregation;
    aggregation = "feeds";
  }

  // If specific Year or Month
  if(year && month){

    var start = new Date(parseInt(year), parseInt(month)-1, 1),
        end = new Date(parseInt(year), parseInt(month)-1, 31);

    search.date = { $gte : start, $lt : end };

  } else if(year){

    var start = new Date(parseInt(year), 0, 1),
        end = new Date(parseInt(year)+1, 0, 1);

    search.date = { $gte : start, $lt : end };

  }
  console.log(search);
  // Perform MongoDB search

  mongous("test.entries").find(search, function(reply){

    if(reply.documents.length == 0){

      resourceNotFound(response, aggregation);

    } else if (type == "text/html" || type == undefined){
      
      build.html(aggregation, reply.documents, function(html){
        OK(response, html, "text/html");
      });

    } else {

      parser.parse(reply.documents, "application/json", type, function(data){
        if(data){
          OK(response, data, type);
        } else{
          unsupportedMediaType(response, type);
        }

      });
    }

  });

}

// Replies

function OK(response, content, type){
  response.writeHead( 200, {"Content-type" : type});
  response.write(content);
  response.end();
}

function resourceNotFound(response) {
  response.writeHead( 404, {"Content-type" : "text/plain"});
  response.write("Resource not found");
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