/*
  A parser module which transforms xml to json.
  Built with Leonidas-from-XIV's node-xml2js https://github.com/Leonidas-from-XIV/node-xml2js/
*/

var xml2js = require('../node_modules/xml2js');


function parse(data, callback){
  (new xml2js.Parser()).parseString( data, function(e, result){
    if (e) throw e;
    callback(result);
  });
}

exports.parse = parse;