// Module for accessing parsers. Pass in data and it will understand what format it is.
// One must supply just what it must be converted to.  
//  
// Available parsers :
// 
// - XML > JSON

var xml2json = require('/planet.js/parsers/xml-to-json');

function Parser() {

  this.parse = function(data, to, callback) {
    var dataType = getDatasType(data);
    switch(dataType + ">" + to){
      case "xml>json" :
        xml2json.parse(data, callback);
        break;
    }
  };

  function getDatasType(data) {
    var type;
    if(data.search("<?xml version=\"1.0\"") >= 0){
      type = "xml";
    }
    try{
      JSON.parse(data);
      type = "json";
    } catch (e) {}
    return type;
  };

}

exports.Parser = Parser;