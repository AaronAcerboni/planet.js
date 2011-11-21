// A utility module for logging to the console.

var fs = require("fs");

// ## toLog
// > Outputs a message to the console.
// >  
// > Parameters :  
// > 
// > - `where` : a string describing the source of the problem.
// > - `what` : a string describing what the problem is.
// > - `danger` : an int representing scale of severity.

function toLog(where, what, danger) {

  var entry = ( new Date() ).toString();

  switch(danger){
    case undefined:
    case 1 :
      entry = "INFO ::";
      break;
    case 2 :
      entry = "WARNING ::";
      break;
    case 3 :
      entry = "ERROR ::";
      break;
  }

  entry += (" @ " + where + " - " + what);
  console.log(entry);
}

exports.report = toLog;