/*
  Utility module for logging to a log file.
*/

var fs = require("fs");

// * Public

function toLog(where, what, danger){
  var entry;
  switch(danger){
    case undefined:
    case 1 : entry = "INFO ::"; break;
    case 2 : entry = "WARNING ::"; break;
    case 3 : entry = "FATAL ::"; break;
  }
  entry += (" @ " + where + " - " + what);
  console.log(entry);

  // ... file write code ...

}

// * Interface

exports.puts = toLog;