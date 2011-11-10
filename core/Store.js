// Responsible for storing data.

var mongous = require("mongous").Mongous;

// ##Storing data
// Stores data collected by an [activity](Activies.html) into MongoDB  
// Parameter :
// - `data` , the data which was processed.
// - `activity`, the `activity_id` responsible for that data.
// - `callback`

function storeData(data, activity, callback){

  var comment = {
    date : undefined,
    commenter : undefined,
    commenter_contact : undefined,
    body : undefined
  }

  var data = {
    title : undefined,
    author : undefined,
    text_summary : undefined,
    text_full : undefined,
    main_image : undefined,
    other_images : [undefined],
    location : [undefined,undefined],
    other : undefined
  }

  var entry = {
    date : undefined,
    resourceLink : undefined,
    data : data,
    aggregation : activity.aggregation,
    activity_id : activity.id,
    pinned : false,
    comments : [comment]
  };
  console.log(entry);
  mongous("test.entries").save(entry);

  callback();
}

// ## Interface


exports.store = storeData;