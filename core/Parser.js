/*
  Module for accessing parsers. Pass in data and
  it will understand what format it is. Supply just
  what it must be converted to.

  Currently available parsers :
    XML > JSON
*/


var dirmap    = require('/planet.js/core/DirMap'),
    xml2json  = require( dirmap.find("$parsers") + "/XMLtoJSON");


// * Private


function commitParse(action){
  var prsData;
  switch(action){
    case "xml>json" : prsData = xml2json.parse(data); break;
    // case "json>xml" : prsData = x.parse(data);        break;
    // case "json>rss" : prsData = x.parse(data);        break;
    // case "json>atom": prsData = x.parse(data);        break;
  }
  return prsData;
}

// * Public


function parse(data, to, callback){
  var parsedData;
      dataType;

  // understand the fed data type (this is probably not secure and should be revised)
  if( data.search("<rss version=\"2.0\">") >= 0 ) dataType = "rss";
  if( data.search("<feed xmlns=")          >= 0 ) dataType = "atom";
  if( dataType == undefined )                     dataType = "json";

  var returnData = commitParse(dataType+">"+to);
  callback({ data : returnData , type: dataType });
}

function parseSync(data, to){
  var parsedData,
      dataType;

  // understand the fed data type (this is probably not secure and should be revised)
  if( data.search("<rss version=\"2.0\">") >= 0 ) dataType = "rss";
  if( data.search("<feed xmlns=")          >= 0 ) dataType = "atom";
  if( dataType == undefined )                     dataType = "json";

  var returnData = commitParse(dataType+">"+to);
  return { data : returnData , type: dataType };
}

// * Interface


exports.parse     = parse;
exports.parseSync = parseSync;