// Module for retrieving data. Currently supports :
//
// - HTTP

var http  = require('http'),
    _     = require('underscore');

function Fetcher() {

  this.get = function(url, callback){

    var urlParts = url.split('/'),
        start = 3,
        path = '',
        httpOptions = {};

    if(url.indexOf('http') == -1){ // if url does not start with http
      start = 1;
    }

    for(var i = start; i < urlParts.length; i++){
      path += '/' + urlParts[i];
    }

    httpOptions.host = urlParts[start-1];
    httpOptions.port = 80;
    httpOptions.path = path;

    http.get(httpOptions, function(res){

      var raw = '';
      res.setEncoding('utf8');

      res.on('data', function(chunk){
        raw += chunk;
      });
      res.on('end', function(){
        callback(null, raw);
      });
    })
    .on('error', function(error){
      callback(error);
    });
  }

}

exports.Fetcher = Fetcher;