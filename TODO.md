# TODO

## General

- `Activities` should be able to read the OAuth syntax from `aggregations.json` and act appropriately.
- Duplicate data check for data entries taken by a Poller activity (a.k.a only add if its new data)

## Processing

> A processing module can be registered with a data source from `aggregations.json` and when that data
> is recieved it will be channelled to the associated processing.
> 
> Processing is just some unique step you can do with a specific set of data.
> 
> For example, retrieving Twitter data gives you a lot fields which you may not be interested in. A Twitter processing module can get rid of this data and funnel the rest of the data in a JSON structure which suits common data structure.

- Create an architechture for allowing custom Processing modules to be assigned to a data entry.
- Processing modules for flickr, twitter etc.

## Activities

- Create a `Subscriber` activity. It will have similar behaviour to the `Poller` but perhaps it could have a listening socket open for data.

- The Polling object's routine should be seperated out using pub/sub.

- Give `Poller` and `Subscriber` activities a common parent object and diversify them using some inheritance.

## Fetch

- Create functionality for allowing Socket connections to be used by a `Subscriber` activity.

## Log

- Log should output to a file and not just the console. This is low priority.