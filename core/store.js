// The module is responsible for storing data retrieved by planet.js processes.

var mongous = require("mongous").Mongous,
    _       = require("underscore");

// ##storeData
// > Stores data collected by an [activity](Activies.html)'s associated process into a MongoDB database.
// > 
// > Parameter : 
// > 
// > - `data` : the data which was processed in the form of an Entry schema.
// > - `activity` : the `activity_id` responsible for creating that data.
// > - `callback`

function storeData(process, data, callback){

  // If there are multiple entries (array) ...
  if(typeof data.length == "number"){
    for (var i = 0; i < data.length; i++) {

      // create full entry object
      var entry = getSchema();
      _.extend(entry, data[i]);
      entry.activity_id = process.id;
      entry.aggregation = process.aggregation;

      // if not dupicate insert into DB
      duplicateCheck(entry, insertIntoDB);
    }
  } // If there is only one entry
  else {
    var entry = getSchema();
    _.extend(entry, data);
    entry.activity_id = process.id;
    entry.aggregation = process.aggregation;

    duplicateCheck(entry, insertIntoDB);
  }

  // Storing procedure completed
  callback();
}

// ##duplicateCheck
// > This function checks to see if the entry is already in the database. A duplicate is found using
// > its `activity_id` and its `date`.
// >  
// > Parameter :
// >  
// > - entry : A schema appropriate object ready to be stored in the database. 
// > - callback

function duplicateCheck(entry, callback){

  mongous("test.feeds").find({date : entry.date, activity_id : entry.activity_id}, function(reply){
    
    if(reply.documents.length == 0){
      callback(entry);
    }
  });
}

// ##insertIntoDB
// > This function stores the entry into the database.
// >  
// > Parameter :
// >  
// > - entry : A schema appropraite object ready to be stored in the database.

function insertIntoDB(entry) {
  mongous("test.feeds").insert(entry);
}

// ##getSchema
// > This function returns a skeletal object representing the full schema of an `entry`.

function getSchema() {

  var entry = {
    date : undefined,
    source_link : undefined,
    aggregation : undefined,
    activity_id : undefined,
    data : {
      title : undefined,
      author_name : undefined,
      author_id : undefined,
      link : undefined,
      text_summary : undefined,
      text_full : undefined,
      main_image : undefined,
      other_images : [undefined],
      location : [undefined, undefined]
    }
  };

  return entry;
}

exports.store = storeData;