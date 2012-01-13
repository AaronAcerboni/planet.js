var fs       = require("fs"),
    mustache = require("mustache");

function html(resource, data, callback){

  fs.readFile("/planet.js/templates/" + resource + ".mustache", 'utf-8', function(e, template){

    var view = {};
    view[resource] = data;

    callback(mustache.to_html(template, view));

  });

}

exports.html = html;