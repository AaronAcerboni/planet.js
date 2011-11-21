// A module which is responsible for creating activities. Activities
// are responsible for the primary routine of aggregation.
//  
// Types of activities :
//
// - Poller
// - Subscriber

var Storer  = require("/planet.js/core/Store"),
    _       = require("underscore");


/* All activity objects */

var pollers = [];
var subscribers = [];


// ## Poller
// > Poller is activity which fires its associated process by a time specified in `aggregations.json`.
// > 
// > Parameters :  
// > 
// > - `feedObj` : a single feed taken from `aggregations.json`
// > - `aggregation` : the name representing the related feeds.

function Poller(feedObj, aggregation) {

  var that = this;

  // An id to identify the process
  this.id               = aggregation + "/" + JSON.stringify(feedObj.resources);

  // The aggregation name the data will be collected under
  this.aggregation      = aggregation;

  // a resource could be a url, authkeys or username/pass etc. Just anything the process needs to use
  // to get its data.
  this.resources         = feedObj.resources;

  // the associated process which gets data in its own unique way and maps it to the storage schema
  this.process          = require("/planet.js/processes/" + feedObj.process);

  // time in ms till the process is ran again
  this.time             = feedObj.activity.time;

  // A Node `intervalId` kept for destroying a polling interval
  this.interval         = undefined;
  
  // `pollingFinished` is a flag which prevents stacking of polling routines.
  var pollingFinished = true;

  // `onPoll` fired every `this.time` (ms).
  function onPoll() {
    if(pollingFinished){

      pollingFinished = false;
      that.process.main(that.resources, function(data) {
        Storer.store(that, data, function(){
          pollingFinished = true;
        })
      });

    }
  }

  // `pollingInterval` is used for creating or destroying the JavaScript
  // `interval` object which facilitates the aggregation loop.
  function pollingInterval(action) {
    if(action === "destroy")
      clearInterval(that.interval);    
    if(action === "create")
      return setInterval(onPoll, that.time);
  }

  // `updateProperties` is a function used for updating a `Poller` object
  this.updateProperties = function(feedObj, aggregation) {
    that.id             = aggregation + "/" + JSON.stringify(feedObj.resources);
    that.aggregation    = aggregation;
    that.resources      = feedObj.resources;
    that.process        = feedObj.process;

    if(that.time != feedObj.time){
      that.time = feedObj.time;
      clearInterval(that.interval);
      that.interval = setInterval(routine, that.time);
    }
  };

  // ### pollNow
  // > Forces the Polling object's polling routine to happen.
  this.pollNow = function() {
    pollingInterval("destroy");
    onPoll();
    pollingInterval("create");
  };

  // ### start
  // > Starts the polling routine.
  this.start = function() {
    that.interval = pollingInterval("create");
    console.log(that.id);
  } 
} // end Poller object

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

// ## Subscriber
// > Subscriber is an Activity which starts a process. It is called subscriber because planet.js assumes if
// > you do not need to poll then you are having data sent to you.
// > 
// > Parameters :  
// > 
// > - `feedObj` : a single feed taken from `aggregations.json`
// > - `aggregation` : the name representing the related feeds.
function Subscriber(feedObj, aggregation){

  var that = this;

  // An id to identify the process
  this.id               = aggregation + "/" + JSON.stringify(feedObj.resources);

  // The aggregation name the data will be collected under
  this.aggregation      = aggregation;

  // a resource can be a url, authkeys, username etc. Just anything the process needs to use to get data.
  this.resources         = feedObj.resources;

  // the associated process which gets data in a unique way.
  this.process          = require("/planet.js/processes/" + feedObj.process);

  this.start = function() {
    that.process.main(that.resources, function(data){
      Storer.store(that, data, function(){});
    });
  };

  this.updateProperties = function(feedObj, aggregation) {
    that.id             = aggregation + "/" + JSON.stringify(feedObj.resources);
    that.aggregation    = aggregation;
    that.resources      = feedObj.resources;
    that.process        = feedObj.process;

    // TODO: Tell the related processes subscription to stop. This allows for a clean
    // restart.
  };

}

// ## startSubscriber  
// >  Starts a Subscriber Activity.
// >  
// > Parameters :  
// >  
// > - `feedObj` : a singular feed taken from `aggregations.json`
// > - `aggregation` : the name representing the related feeds.

function startSubscriber(feedObj, name) {
  var subscriber = new Subscriber(feedObj, name);
  subscriber.start();
  subscribers.push(subscriber);
}

// ## get
// > Returns an Activity object by its `id`
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

exports.startPoller = startPoller;
exports.pollers = pollers;
exports.pollAll = pollAll;

exports.startSubscriber = startSubscriber;
exports.subscribers = subscribers;

exports.get = get;