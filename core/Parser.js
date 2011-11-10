// Module for accessing parsers. Pass in data and it will understand what format it is.
// Supply just what it must be converted to.
// Available parsers :
// - XML > JSON

var xml2json    = require('/planet.js/parsers/XMLtoJSON');

// ## Parsing
// Parameters :  
// - `data` , the data which has to be parsed.
// - `to` , the desired format.
// - `callback`

function parse(data, to, callback) {
  var parsedData,
      dataType;

  if( data.search("<rss version=\"2.0\">") >= 0 )
    dataType = "rss";

  if( data.search("<feed xmlns=") >= 0 )
    dataType = "atom";

  if( dataType == undefined )
    dataType = "json";

  switch(dataType + ">" + to){
    case "xml>json" :
      parsedData = xml2json.parse(data);
      break;
  }

  callback(
    { data : parsedData , type: dataType }
  );
}

// ## Interface

exports.parse = parse;