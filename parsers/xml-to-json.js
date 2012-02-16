/*
  A parser module which transforms xml to json.
  Built with Leonidas-from-XIV's node-xml2js https://github.com/Leonidas-from-XIV/node-xml2js/
*/

var Parser = require('../node_modules/xml2js').Parser;

function parse(data, callback){
  var parser = new Parser();
  parser.parseString(data, function(e, result){
    if(e) console.log('Error found on xml2js parse : \n' + e.message);
    callback(result);
  });
}

exports.parse = parse;