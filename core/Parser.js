// Module for accessing parsers. Pass in data and it will understand what format it is.
// One must supply just what it must be converted to.  
//  
// Available parsers :
// 
// - XML > JSON

var xml2json    = require('/planet.js/parsers/XMLtoJSON');

// ## parse
// > Returns parsed data of a desired format.
// >  
// > Parameters :  
// > 
// > - `data` : the data which has to be parsed.
// > - `to` : the desired format.
// > - `callback`

function parse(data, to, callback) {
  var dataType = getDatasType(data);

  switch(dataType + ">" + to){
    case "xml>json" :
      xml2json.parse(data, function(returnedData){
        callback(returnedData);
      });
      break;
  }
}

// Figures out what sort of data format the data is in and therefore what parser
// to use.

function getDatasType(data) {
  var type;
  if(data.search("<?xml version=\"1.0\"") >= 0){
    type = "xml";
  }

  try{
    JSON.parse(data);
    type = "json";
  } catch(e){}

  return type;
}


exports.parse = parse;