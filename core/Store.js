// The module responsible for storing data.

var mongous = require("mongous").Mongous,
    _       = require("underscore");

// ##Storing data
// > Stores data collected by an [activity](Activies.html) into MongoDB  
// > 
// > Parameter : 
// > 
// > - `data` : the data which was processed.
// > - `activity` : the `activity_id` responsible for that data.
// > - `callback`

function storeData(process, data, callback){

  // TODO: Check for duplicates using the date and another unique field. Process id
  // is considered but can easily fall over if the process id make up is changed.

  // If there are multiple entries (array) ...
  if(typeof data.length == "number"){
    for (var i = 0; i < data.length; i++) {

      // create full entry object
      var entry = getSchema();
      _.extend(entry, data[i]);
      entry.activity_id = process.id;
      entry.aggregation = process.aggregation;

      // if not dupicate insert into DB
      duplicateCheck(entry , insertIntoDB);
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

function duplicateCheck(entry, insertCallback){
  mongous("test.entries").find({date : entry.date, activity_id : entry.activity_id}, function(reply){
    if(reply.documents.length == 0){
      insertCallback(entry);
    }
  });
}

function insertIntoDB(entry) {
  mongous("test.entries").insert(entry);
  console.log("inserted entry");
}

function getSchema() {

  var data = {
    title : undefined,
    author : undefined,
    link : undefined,
    text_summary : undefined,
    text_full : undefined,
    main_image : undefined,
    other_images : [undefined],
    location : [undefined,undefined],
    other : undefined
  };

  var entry = {
    date : undefined,
    source_link : undefined,
    aggregation : undefined,
    activity_id : undefined,
    pinned : false,
    data : data
  };

  return entry;
}

exports.store = storeData;