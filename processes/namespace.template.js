// ## Process module basics
// This is a template Process module which hopefully demonstrates how one can intergrate their own
// Process in planet.js.

// ## Suggested modules
// Your Process can utilise planet.js' `Fetch` & `Parser` module. But feel free to use your own or
// improve on the natives.
//  
// If your Process module is acting as a Subscriber then you will be responsible for establishing
// your connection from within here.

var Fetcher = require('../core/fetch'),
    Parser  = require('../core/parser'),
    _       = require('underscore');

// ## Getting started

// Your process will be initiated on every poll or just once if its registered as a Subscriber. As
// a Subscriber it's up to you to create your own socket/comet connection. A process is initiated by running
// a Processes' main function.
//  
// The main function will be passed the resource object which could contain a url (`resources.url`) or
// authentication keys (`resources.apikey`, `resources.apisecret`).
//  
// Additionally you will be passed a callback which you call when you're ready to store processed 
// data. The callback takes one parameter; either an object or an array of objects. The object must
// match the storage schema's `Entry` document. Planet.js takes care of duplicate data by comparing
// previous dates alongside a process id.

function whatever(resources, callback){
  
}

// ## Making it accessible

// Make sure you export the function you wish to receive the `resources` and `callback` params as `main`.

exports.main = whatever;