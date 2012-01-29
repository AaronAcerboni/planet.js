# TODO

## High priority

### General

- HTML templating. Layout currently can't handle large images.

- Change the planet.js standard schema to be a superset of the Google Feed API schema. This
should hopefully increase compatability with pre-existing software.

## Low priority

### General

- Use consistent naming conventions for variables throughout planet.js.

- Detect gathered information if not new before it goes to the Store module and reads db.

- Explore instances were underscore is used and consider Ecma 5th functions (forEach) instead.

### Router

- Routed URLs should probably be case insensitive.

### Runners

- Provide a runner for listeners (thing which need callback/pingback urls).

### Processing

- Processing modules for flickr, hAtom & Atom.

### Other

- Keep API Docs updated.

- Write unit tests.

- Write up planet.js as npm package.
