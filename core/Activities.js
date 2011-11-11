// A module which is responsible for creating activities. Activities
// are responsible for the primary routine of aggregation.
//  
// Types of activities :
//
// - Poller

var Fetcher = require("/planet.js/core/Fetch"),
    Parser  = require("/planet.js/core/Parser"),
    Storer  = require("/planet.js/core/Store"),
    Log     = require("/planet.js/core/Log"),
    _       = require("underscore");


/* All activity objects */

var pollers = [];
var subscribers = [];


// ## Poller
// > Poller is activity which gets its data by polling a resource.
// > 
// > Parameters :  
// > 
// > - `feedObj` : a singular feed taken from `aggregations.json`
// > - `aggregation` : the name representing the related feeds.

function Poller(feedObj, aggregation) {

  var that = this;

  this.id               = aggregation + "/" + JSON.stringify(feedObj.resource);
  this.aggregation      = aggregation; // Aggregation name that the collected data will be under
  this.resource         = feedObj.resource; // url or url+authkeys
  this.pollTime         = feedObj.collection.pollTime; // Time (ms) to run a polling routine
  this.process          = feedObj.process; // associated data process to be ran on the fetched data
  this.interval         = undefined; // Node 'intervalId' kept for destroying a setInterval
  
  // `pollingFinished` is a flag which prevents stacking of polling routines. For example :
  // `fetchResource` may fire before the previous poll is finished due to factors like web latency. 
  var pollingFinished = true;

  // `fetchResource` is responsible for getting data by using the [Fetch](Fetch.html) module
  function fetchResource() {
    if(pollingFinished){
      pollingFinished = false;
      /* TODO: OAuth and not just simple GET */
      Fetcher.fetch(that.resource, function(err, data){
        if(err){ // Assuming failed GET request
          Log.report("Activities:Poller", err.message, 2);
        } else { // Success
          parseResource(data);
        }
      })
    }
  }

  // `parseResource` is responsible for parsing the data to JSON using the [Parser](Parser.html)
  function parseResource(res) {
    var data;
    try {
      data = JSON.parse(res); // Assuming it's JSON
      processResource(res);
    } catch (e) {
      Parser.parse(res, "json", function(res){
        processResource(res);
      });
    }
  }

  // `processResource` is responsible for passing the JSON data to any associated 
  // processing.
  function processResource(res) {
    if(that.process != undefined){

    }
    storeResource(res);
  }

  // `storeResource` is responsible for storing the data using the [Store](Store.html)
  // module.
  function storeResource(res) {
    Storer.store(res, that, function(){
      pollingFinished = true;
      console.log("Activities.js > Routine has finished !");
    });
  }

  // `pollingInterval` is used for creating or destroying the JavaScript
  // `interval` object which facilitates the aggregation loop.
  function pollingInterval(action) {
    if(action === "destroy") clearInterval(that.interval);        
    if(action === "create")  return setInterval(fetchResource, that.pollTime);
  }

  // `updateProperties` is a function used for updating a `Poller` object
  this.updateProperties = function(feedObj, aggregation) {
    that.id             = aggregation + "/" + JSON.stringify(feedObj.resource);
    that.aggregation    = aggregation;
    that.resource       = feedObj.resource;
    that.process        = feedObj.process;
    that.archive        = feedObj.archive;

    if(that.pollTime != feedObj.pollTime){
      that.pollTime     = feedObj.pollTime;
      clearInterval(that.interval);
      that.interval     = setInterval(routine, that.pollTime);
    }
  };

  // ### pollNow
  // > Forces the Polling object's polling routine to happen.
  this.pollNow = function() {
    pollingInterval("destroy");
    routine();
    pollingInterval("create");
  };

  // ### start
  // > Starts the polling routine.
  this.start = function() {
    console.log("Activities.js > " + that.id + " start")
    that.interval = pollingInterval("create");
  } 
}

// ## startPoller  
// >  Begins the polling loop.
// >  
// > Parameters :  
// >  
// > - `feedObj` : a singular feed taken from `aggregations.json`
// > - `aggregation` : the name representing the related feeds.

function startPoller(feedObj, name) {
  var poller = new Poller(feedObj, name);
  poller.start();
  pollers.push(poller);
}

// ## pollAll
// > Forces a polling routine on all existing polling objects.
// > **May be too intensive**

function pollAll(){
  _.each(pollers, function(i) {
    i.pollNow();
  })
}

// ## get
// > Returns a `Poller` object by its `id`
// >
// > Parameters:
// > 
// > - `id` : A string id unique to the desired `Poller`

function get(id) {
  _.find(pollers, function(i) {
    return (i.id == id);
  })
  _.find(subscribers, function(i) {
    return (i.id == id);
  })
}

exports.startPoller   = startPoller;
exports.Poller        = Poller;
exports.pollers       = pollers;
exports.get           = get;
exports.pollAll       = pollAll;