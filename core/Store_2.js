/*
  Module responsible for storing data.
  Relies on Mongoose but not set in stone.
*/

var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

// Schema types

var schemaRSS = {};
var schemaATOM = {};
var schemaLoose = {any : {}};


// * Public

// Data storing procedure could radically change !
function storeData(data, consumer, callback){

  //defined schema
  var AggregationSchema = {};
  var aggName = consumer.aggregation;
  AggregationSchema[name] = { "rss" : undefined }; // rss structures go here
  AggregationSchema[name] = { "atom" : undefined }; // atom structures go here
  AggregationSchema[name] = { "rest" : undefined }; // json goes here?

  var schema;

  //Decide what schema structure to use
  switch(consumer.dataType){
    case "rss" : schema = new Schema(schemaRSS); break;
    case "atom" : schema = new Schema(schemaATOM); break;
    case "json" : schema = new Schema(schemaLoose); break;
    default : throw new Error();
  }

  console.log(AggregationSchema);
  callback();
}

// * Interface


exports.store = storeData;