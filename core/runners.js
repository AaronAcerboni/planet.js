var storer  = require("/planet.js/core/store");

function Runner(options, aggregation) {
    var that         = this;

    this.options     = options;
    this.id          = aggregation + '/' + JSON.stringify(options.resources);
    this.aggregation = aggregation;
    this.resources   = options.resources;
    this.processes   = [];

      for (var i = 0; i < options.processes.length; i++) {
          this.processes.push( require('/planet.js/processes/' + options.processes[i]).main );
      };
    
    this.currentProcess = 0;

    var that            = this,
        finalCallback   = null;

    this.process = function(data, final) {
        var data = data;

        if(!data) data = options;
        if(final) finalCallback = final;

        if(that.currentProcess + 1 > that.processes.length) {
            that.currentProcess = 0;
            storer.store(that, data, finalCallback);
        } else {
            that.currentProcess++;
            new that.processes[that.currentProcess-1](data, that.process);
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
        that.prototype.process(null, function(){
            // final callback hack for setting the currentProcess
            // so tweets can be stored not just on the first one
            // --- should revise!!
            that.prototype.currentProcess = 1;
        });
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