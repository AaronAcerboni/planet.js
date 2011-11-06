/*
  Module which maps important planet.js directories
  to strings with the location identifiers.

  This functionality could be fused into the Router module
*/

var keys = {
  "$processes"        : "/planet.js/processes",
  "$parsers"          : "/planet.js/parsers",
  "$local_resources"  : "/planet.js/feeds/local"
};

// Identifier(s) in the string input must be preconcatinated with a $
function mapToDirectoy(str) {
  for (x in keys){
    str = str.replace(x.toString(), keys[x]);
  }
  return str;
}

// Identifier in the string input do not need to be preconcatinated with a $
function getDirectoryFromIdentifier(id) {
  for (x in keys){
    if(
      id === x ||
      id === x.substring(1)
    ) {
      return keys[x];
      }
  }
  throw new Error(
    "Valid keys are "+listKeys() + ". Optionally prepended with a $"
  );
}

// Lists all identifiers. Output is seperated by a , and a space.
function listKeys() {
  var list = "";
  for(id in keys){
    list += id+", ";
  }
  return list.slice(0,-2);
}

// * Interface

exports.map  = mapToDirectoy; //use if you want to map a string with multiple identifiers
exports.find = getDirectoryFromIdentifier; //use if you just want the directory from one identifier
exports.list = listKeys;