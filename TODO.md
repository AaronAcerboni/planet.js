# TODO

## General

- `Activities` should be able to read the OAuth syntax from `aggregations.json` and act appropriately.
- Duplicate data check for data entries taken by a Poller activity

## Processing

- Create an architechture for allowing custom Processing modules
- Processing modules for flickr, twitter etc.

## Activities

- Create a `Subscriber` activity. It will have similar behaviour to the `Poller` but perhaps it could have a listening socket open for data.

- The Polling object's routine should be seperated out using pub/sub.

## Fetch

- Create functionality for allowing Socket connections to be used by the still to come `Subscriber` activity.

## Log

- Log should output to a file and not just the console. This is low priority.