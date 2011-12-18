var mongous = require("mongous").Mongous,
    parser  = require("/planet.js/core/parser");

// Todo :
// 1. Decide on the url structures order
// 2. Have parser.js read mime types so I don't need all these conditions
// 3. Make this method less http opinionated.

function GET(resource, filter, type, response) {
  
  var search = {};

  if(resource != null) search.aggregation = resource;
  if(filter != null) search.aggregation ;

  mongous("test.entries").find(search, function(reply){

    if(reply.documents.length == 0){
      response.writeHead(404, {"Content-Type" : "text/plain"});
      response.write("Resource not found");
      response.end();
    } else if (type == "application/json"){
      entries = JSON.stringify(reply.documents);
      response.writeHead(200, {"Content-type" : type});
      response.write(entres);
      response.end();
    } else {
      response.writeHead(200, {"Content-type" : "text/html"});
      response.write("A html representation of the requested data");
      response.end();
    }

  });

}

function POST() {}

function PUT() {}

function DELETE() {}

exports.GET = GET;
exports.POST = POST;
exports.PUT = PUT;
exports.DELETE = DELETE;