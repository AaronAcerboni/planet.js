/*
  Module responsible for storing data.
  Relies on Mongoose but not set in stone.
*/

var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;


// Define schemas

var schemaFeeds = {
  id : String,
  data : String
};

var schemaAggregations = {
  name : String,
  feeds : [schemaFeeds]
};

// * Public

// Data storing procedure could radically change !
function storeData(data, consumer, callback){

  //Connection using mongo url scheme
  mongoose.connect('mongodb://localhost/test');

  var consumerId = consumer.id;
  var aggName = consumer.aggregation;

  // Set up schemas

  var Feeds = new Schema(schemaFeeds);

  var Feed = mongoose.model("Feeds", Feeds);
  var feedInstance = new Feed();
  feedInstance.id = consumerId;
  feedInstance.data = JSON.stringify(data);

  var Aggregations = new Schema(schemaAggregations);

  var Aggregation = mongoose.model("Aggregations", Aggregations);
  var aggregationInstance = new Aggregation();
  aggregationInstance.name = aggName;
  aggregationInstance.feeds.push( {id : consumerId, data : JSON.stringify(data)} );

  //Insert into db
  aggregationInstance.save(function(err){
    if(err) throw err;
    sys.puts('Saved');
    callback();
  });

}

// * Interface


exports.store = storeData;