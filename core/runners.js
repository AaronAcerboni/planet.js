var storer  = require('./store'),
    base64  = require('b64');

function Runner(options, aggregation) {
    var composite    = aggregation + JSON.stringify(options.resources),
    that             = this,
    i                = -1;

    this.options     = options;
    this.id          = base64.encode(composite);
    this.aggregation = aggregation;
    this.resources   = options.resources;
    this.processes   = options.processes.map(function (item) {
        return require('../processes/' + item);
    });

    this.process = function(data) {
        if(i === that.processes.length-1 && data){
            storer.store(that, data);
            i = -1;
        } else if(i === -1){
            i++;
            new that.processes[i].main(that.options, that.process);
        } else {
            i++;
            new that.processes[i].main(data, that.process);
        }
    };

}

function Poller() {
    var that  = this;

    this.start = function(){
        setInterval(function(){
            poll();
        }, that.prototype.options.runner.time);
    };

    function poll() {
        that.prototype.process(null);
    };

}

function Subscriber() {
    var that = this;

    this.start = function(){
        that.prototype.process();
    };

}

exports.start = {
    poller: function(options, aggregation) {
        var poller = new Poller();
        poller.prototype = new Runner(options, aggregation);
        poller.start();
    },
    subscriber: function(options, aggregation) {
        var subscr = new Subscriber();
        subscr.prototype = new Runner(options, aggregation);
        subscr.start();
    },
    pingbacker: function(options, aggregation) {
        var pingba = new Pingbacker();
        pingba.prototype = new Runner(options, aggregation);
        pingba.start();
    }
};