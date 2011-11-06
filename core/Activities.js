/*
  A module which is responsible for creating and managing polling activities.
*/


var Fetcher = require("/planet.js/core/Fetch"),
    Parser  = require("/planet.js/core/Parser"),
    Storer  = require("/planet.js/core/Store"),
    Log     = require("/planet.js/core/Log"),
    _       = require("underscore");


// * All activity Poller objects


var all = [];


// * Activity Poller object class

function Poller(feedObj, aggregation) {

  var that = this;

  this.id               = aggregation + "/" + JSON.stringify(feedObj.resource);
  this.aggregation      = aggregation; // Aggregation name that the collected data will be under
  this.resource         = feedObj.resource; // url or url+authkeys
  this.pollTime         = feedObj.collection.pollTime; // Time (ms) to run a polling routine
  this.process          = feedObj.process; // associated data process to be ran on the fetched data
  this.interval         = undefined; // Node 'intervalId' kept for destroying a setInterval

  // Internal methods

  var pollingFinished = true; // Flag; prevents stacking of the polling routine

  function fetchResource() {
    if(pollingFinished){
      pollingFinished = false;
      // TODO: OAuth and not just simple GET
      Fetcher.fetch(that.resource, function(data, failed){
        parseResource(data);
      })
    }
  }

  function parseResource(res) {
    var data;
    // parse
    try {
      data = JSON.parse(res); // Assuming it's JSON
      processResource(res);
    } catch (e) {
      if(failed){ // Assuming failed GET request
        Log.put("Activities:Poller", failed.message, 2);
      } else {
        var result = Parser.parse(res, "json", function(res){
          processResource(res);
        });
      }
    }
  }

  function processResource(res) {
    if(that.process != undefined){
    //process data - this is important for feed sources like Twitter
    // which carry their data in inconsistent JSON structures
    }
    storeResource(res);
  }

  function storeResource(res) {
    Storer.store(res, that, function(){
      pollingFinished = true;
      console.log("Activities > Routine has finished !");
    });
  }

  function pollingInterval(action) {
    if(action === "destroy") clearInterval(that.interval);        
    if(action === "create")  console.log(that.pollTime); return setInterval(fetchResource, that.pollTime);
  }

  // Public methods

  this.init = function() { // runs at bottom of class definition
    console.log("Activities > " + that.id + " init")
    that.interval = pollingInterval("create");
  } 

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

  this.pollNow = function() {
    pollingInterval("destroy");
    routine();
    pollingInterval("create");
  };
}

// * Public Methods

function startPoller(feedObj, name) {
  var poller = new Poller(feedObj, name);
  poller.init();
  all.push(poller);
}

function pollAll(){ //might be too heavy
  _.each(all, function(i) {
    i.pollNow();
  })
}

function get(id) {
  _.find(all, function(i) {
    return (i.id == id);
  })
}


// * Interface


exports.startPoller   = startPoller;
exports.Poller        = Poller;
exports.all           = all;
exports.get           = get;
exports.pollAll       = pollAll;