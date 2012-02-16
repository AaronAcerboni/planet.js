// Module for retrieving data. Currently supports :
//
// - HTTP via request library

var request = require('request');

function Fetcher() {

  this.get = function(url, callback){

    request(url, function (error, response, body) {
      if (!error) {
        console.log(body);
        callback(body);
      } else {
        console.log('HTTP error in core/fetch');
      }
    })

  }

}

exports.Fetcher = Fetcher;