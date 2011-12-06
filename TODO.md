# TODO

## High priority

### General

- Revise core modules like Fetch, Parse and processing modules to work as 
class instances. This should prevent errors when more than one processing 
module utilises the core modules since they overlap. This overlapping also can 
occur when two activities run the same process.

- Routers and Request handlers.


## Low priority

### General

- Use better names for describing "Activities" and "Processes".

- Use consistent naming conventions for variables throughout planet.js.

- Detect gathered information as not new before it goes to the Store module.

### Activities

- Give `Poller` and `Subscriber` activites a common parent object.

- Provide an Activity for listeners (thing which need callback/pingback urls).

### Processing

- Processing module for flickr.

- Processing module which reads hAtom.

- Processing module which reads Atom.

### Log

- Log should output to a file and not just the console.

### Other

- Keep API Docs updated.

- Write unit tests.

- Write up planet.js as npm package.