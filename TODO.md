# TODO

## High priority

### General


- Router and Methods (aka Request handlers).

- Make router work as a object instance since resources are made dynamically
based on `aggregations.json`

- Change the planet.js standard schema to be a superset of the Google Feed API schema. This
should hopefully increase compatability with pre-existing software.


## Low priority

### General

- Revise names for describing "Activities" and "Processes".

- Use consistent naming conventions for variables throughout planet.js.

- Detect gathered information as not new before it goes to the Store module.

- Explore instances were underscore is used and consider Ecma 5th edition functions.

### Activities

- Give `Poller` and `Subscriber` activites a common parent object.

- Provide an Activity for listeners (thing which need callback/pingback urls).

### Processing

- Processing modules for flickr, hAtom & Atom.

### Log

- Log should output to a file and not just the console.

### Other

- Keep API Docs updated.

- Write unit tests.

- Write up planet.js as npm package.
