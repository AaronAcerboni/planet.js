var mongous = require("mongous").Mongous,
    Parser  = require("/planet.js/core/parser").Parser;

// Methods

function GET(aggregation, year, month, type, response) {
    
  var parser = new Parser(),
      search = {};

  // Prepare search criteria

  //  by specific aggregation?
  if(aggregation != "feeds"){
    search.aggregation = aggregation;
  }

  //  by Specific Year or Month?
  if(year != null && month != null){
    var year = parseInt(year),
        month = (parseInt(month)) - 1,
        end = new Date();

    var start = new Date(year, month, 31);

    search.created_on = {$gte : start, $lt : end };
  } else if (year != null){
    var year = parseInt(year),
        end = new Date();

    var start = new Date(year, 0, 1);

    search.created_on = {$gte : start, $lt : end};
  }

  // Carry out MongoDB search and reply accordingly
  // If not unspecified or text/html then it defaults to JSON (for now)

  mongous("test.entries").find(search, function(reply){

    if(reply.documents.length == 0){
      resourceNotFound(response, aggregation);
    } else if (type == "text/html" || type == undefined){
      console.log("Someone has asked for a html representation of " + aggregation);
      OK(response, "HTML not ready yet", "text/html");
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
  response.writeHead( 200, {"Content-type" : type});
  response.write(content);
  response.end();
}

exports.GET = GET;

exports.resourceNotFound = resourceNotFound;
exports.unsupportedMediaType = unsupportedMediaType;
exports.OK = OK;