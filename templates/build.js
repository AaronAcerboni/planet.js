var fs       = require("fs"),
    mustache = require("mustache");

function html(aggregation, entries, callback){

  fs.readFile("/planet.js/templates/index.mustache", 'utf-8', function(e, template){
    
    var view = {
      aggregation : aggregation,
      entry : entries
    };
    
    callback(mustache.to_html(template, view));

  });

}

exports.html = html;