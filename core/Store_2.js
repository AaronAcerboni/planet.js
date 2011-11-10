/*
  Module responsible for storing data.
  Relies on Mongoose but not set in stone.
*/

var mongoose  = require('mongoose'),
    sys       = require('sys'),
    Schema    = mongoose.Schema;


// Define schemas

var schemaEntry = {
  date : Date,
  aggregation : String,
  data : String,
  activity : String
};

// * Public

// Data storing procedure could radically change !
function storeData(data, activity, callback){

  //Connection using mongo url scheme
  mongoose.connect('mongodb://localhost/test');

  var consumerId = activity.id;
  var aggName = activity.aggregation;

  // Set up schema

  var Entries = new Schema(schemaEntry);

  var Entry = mongoose.model("Entries", Entries);
  var entry = new Entry();

  entry.date = new Date();
  entry.aggregation = activity.aggregation;
  entry.data = JSON.stringify(data);
  entry.activity = activity.id;


  //Insert into db
  entry.save(function(err){
    if(err) throw err;
    sys.puts('Store.js > Saved to db');
    callback();
  });

}

// * Interface


exports.store = storeData;