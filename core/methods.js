var mongous = require("mongous").Mongous,
    Parser  = require("/planet.js/core/parser").Parser,
    build   = require("/planet.js/templates/build");

// Methods

function GET(aggregation, year, month, type, response) {

  console.log(aggregation, year, month, type);

  var parser = new Parser(),
      search = {};

  // Prepare search criteria ...

  // Specific aggregation (case insensitive)
  if(aggregation != "feeds") search.aggregation = aggregation;

  // Specific Year or Month
  if(year != null && month != null){

    var start = new Date(parseInt(year), parseInt(month)-1, 1),
        end = new Date(parseInt(year), parseInt(month)-1, 31);

    search.date = { $gte : start, $lt : end };

  } else if(year != null){

    var start = new Date(parseInt(year), 0, 1),
        end = new Date(parseInt(year)+1, 0, 1);

    search.date = { $gte : start, $lt : end };

  }

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
          httpOK(response, data, type);
        } else{
          unsupportedMediaType(response, type);
        }

      });
    }

  });

}

// Replies

function resourceNotFound(response, resource) {
  response.writeHead( 400, {"Content-type" : "text/plain"});
  response.write("Resource not found: " + resource);
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

function OK(response, content, type){
  console.log("AA");
  response.writeHead( 200, {"Content-type" : type});
  response.write(content);
  response.end();
}

exports.GET = GET;

exports.resourceNotFound = resourceNotFound;
exports.unsupportedMediaType = unsupportedMediaType;
exports.OK = OK;