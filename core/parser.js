// Module for accessing parsers. Pass in data and it will understand what format it is.
// One must supply just what it must be converted to.  
//  
// Available parsers :
// 
// - XML > JSON

var xml2json = require('../parsers/xml-to-json');

function Parser() {

  this.parse = function(data, type, to, callback) {

    switch(type + " > " + to){
      case "text/xml > application/json" :
      case "application/rss+xml > application/json" :
      case "application/xml > application/json" :
        xml2json.parse(data, callback);
        break;
        
      default :
        callback(null);
        break;
    }

  };

}

exports.Parser = Parser;