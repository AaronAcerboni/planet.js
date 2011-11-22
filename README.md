#Planet.js#

Planet.js is a JavaScript data aggregator in the spirit of Planet software. It aims to be a server environment for creating and managing sites which are data driven.

The magic of planet.js is the ability to synchronise a variety of data ranging from standard RSS to any old web service. Possible use cases are for community sites, sticking your blogs together or anything else you want to hack together with data sources.

Versatility is a philosophy planet.js wants to abide by. This means various ways of getting hold of data, various ways of manipulating it and various ways of outputting it.

##Development##

Current development aim:

* Still to be decided. Consider looking at the TODO list.

##Getting started##
Please note directories set in planet.js start from the system root `/planetjs` (This is just for my testing environment) 

`node Server.js`

###Versions and Dependencies###
Tested on Node v0.4.12 & v0.4.9

* Node v0.4.12 (reccomended)
* MongoDB

Provided modules:

* [mongouse](https://github.com/amark/mongous) v0.1.0
* [underscore](http://documentcloud.github.com/underscore/) v1.2.1
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) v0.1.11
* [jasmine-node](https://github.com/pivotal/jasmine) v1.0.12 (unit tests not yet implemented &mdash; sorry!)

###Components / Modules###
Server : `server.js`  

> Starts up the planet.js server. This involves the main HTTP listening loop, and code which starts up the polling activities.  

Init : `core/init.js`

> First module run. Currently manifests the aggregation sets in `aggregations.json` into running Activities.

Activities : `core/Activities.js`  

> Creates Polling and Subscriber objects. These objects are derived using the `aggregations.json` configuration file. Polling objects call upon their associated process every n milliseconds as defined in `aggregations.json`. Subscriber objects are not polled and assume their associated process sets up a listening connection.

Fetch : `core/Fetcher.js`  

> Responsible for getting data. Currently supports HTTP GET.  

Parser : `core/Parser.js`  

> Takes in data and parses it to JSON. It does this by specific parsing modules found in `/parsers`. Currently only converts data to JSON.  

Store : `core/Store.js`  

> Component responsible for storing data to the MongoDB database.  

####Lesser component(s)####

Log : `core/Log.js`  

> Component for logging to the console with associated error levels.  


##Developer blogs##
* [http://planetjs.tumblr.com/](http://planetjs.tumblr.com) &mdash; Development blog

* [http://planetjsresearch.tumblr.com/](http://planetjsresearch.tumblr.com) &mdash; Research blog