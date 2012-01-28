var storer  = require("/planet.js/core/store");

function Runner(options, aggregation) {
    this.options     = options;
    this.id          = aggregation + '/' + JSON.stringify(options.resources);
    this.aggregation = aggregation;
    this.resources   = options.resources;
    this.processes   = [];

      for (var i = 0; i < options.processes.length; i++) {
          this.processes.push( require('/planet.js/processes/' + options.processes[i]).main );
      };
    
    var that           = this,
        currentProcess = 0,
        finalCallback  = null;

    this.process = function(data, final) {
        var data = data;

        if(!data) data = options;
        if(final) finalCallback = final;

        if(currentProcess + 1 > that.processes.length) {
            storer.store(that, data, finalCallback);
        } else {
            currentProcess++;
            that.processes[currentProcess-1](data, that.process);
        }

    }

}

function Poller() {
    var that  = this,
        ready = true;


    this.start = function(){
        setInterval(function(){
            poll();
        }, that.prototype.options.runner.time);
    };

    function poll() {
        if(ready){
            ready = false;
            that.prototype.process(null, function(){
                ready = true;
            });
        }
    };


}

function Subscriber() {
    var that = this;

    this.start = function(){
        that.prototype.process();
    };
}

function Pingbacker() {
    
}

exports.start = {
    "poller" : function(options, aggregation) {
        var poller = new Poller();            
                
        poller.prototype = new Runner(options, aggregation);

        poller.start();
    },
    "subscriber" : function(options, aggregation) { 
        var subscr = new Subscriber();

        subscr.prototype = new Runner(options, aggregation);

        subscr.start();
    },
    "pingbacker" : function(options, aggregation) {
        var pingba = new Pingbacker();
      
        pingba.prototype = new Runner(options, aggregation);

        pingba.start();
    }
};