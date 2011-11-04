/*
  A module which is responsible for creating and managing consumer activities.
  Consumer activities 
*/


var Fetcher = require("/planet.js/core/Fetch"),
    Parser  = require("/planet.js/core/Parser"),
    Storer  = require("/planet.js/core/Store"),
    Log     = require("/planet.js/core/Log"),
    _       = require("underscore");


// * All activity Consumer objects


var all = [];


// * Activity Consumer object class

function Consumer(feedObj, name){
  var that = this;

  this.id               = name+"/"+feedObj.resource;
  this.aggregation      = name;
  this.resource         = feedObj.resource;
  this.process          = feedObj.process;
  this.pollTime         = feedObj.pollTime;
  this.archive          = (feedObj.archive != undefined) ? feedObj.archive : false;
  this.interval         = undefined; // intervalId kept for destroying a setInterval
  this.dataType         = undefined; // dataType discovered after fetch

  // Internal methods

  var pollingFinished = true; // Routine is skipped until polling is finished
  //   Fetch data, process it & store it
  function routine(){
    console.log("Routine fired - pollingFinished == "+pollingFinished);
    if(pollingFinished){

      pollingFinished = false;
        
      // Interfacing between fetch probably can probably be cleaner
      Fetcher.fetch(that.resource, function(data, failed){

        var dataType; //rss atom or json

        try { // assuming data fetched is JSON
          data = JSON.parse(data);
        } catch(e) { // Assumption : its a different format or GET failed

          if(failed){
            Log.put("Activities:Consumer", failed.message, 2);
          } else {
            result = Parser.parseSync(data, "json");
            data = result.data;
            that.dataType = result.type;
          }

        } //end try..catch

        if(that.process != undefined){
          //process data - this is important for 'unusual feed sources' like twitter
        }

        Storer.store(data, that, function(){
          pollingFinished = true;
          console.log(that.id + " data stored in db.");
        });
      });
    }

  };

  function manageInterval(action){
    if(action==="destroy") clearInterval(that.interval);        
    if(action=== "create") return setInterval(routine, that.pollTime);
  }

  function init(){ // runs at bottom of class definition
    if(feedObj.polling != undefined){
      console.log("init")
      that.interval = manageInterval("create");
    }
  } 

  // Public methods

  this.updateProperties = function(feedObj, name){
    that.id             = name+"/"+feedObj.resource;
    that.aggregation    = name;
    that.resource       = feedObj.resource;
    that.process        = feedObj.process;
    that.archive        = feedObj.archive;

    if(that.pollTime != feedObj.pollTime){
      that.pollTime     = feedObj.pollTime;
      clearInterval(that.interval);
      that.interval     = setInterval(routine, that.pollTime);
    }
  };

  this.pollNow          = function(){
    manageInterval("destroy");
    routine();
    manageInterval("create");
  };

  init();
}

// * Public Methods

function startConsumer(feedObj, name, canPollNow){
  var c = new Consumer(feedObj, name);
  all.push(c);
  // return c;
}

function pollAll(){ //might be too heavy
  _.each(all, function(i){
    i.pollNow();
  })
}

function get(id){
  _.find(all, function(i){
    return (i.id == id);
  })
}

// * Interface


exports.startConsumer  = startConsumer;
exports.Consumer      = Consumer;
exports.all           = all;
exports.get           = get;
exports.pollAll       = pollAll;