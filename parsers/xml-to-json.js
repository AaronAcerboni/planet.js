/*
  A parser module which transforms xml to json.  
  Built with buglabs' node-xml2json parser https://github.com/buglabs/node-xml2json
*/

var xml2js = require('/planet.js/node_modules/xml2js');


function parse(data, callback){
  (new xml2js.Parser()).parseString( data, function(err, result){
    if (err) throw err;
    callback(result);
  });
}

exports.parse = parse;