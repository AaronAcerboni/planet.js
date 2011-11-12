#Planet.js#

Planet.js is a JavaScript data aggregator in the spirit of Planet software. It aims to be a server environment for creating and managing sites which are data driven.

The magic of planet.js is the ability to synchronise a variety of data ranging from standard RSS to any old web service. Possible use cases are for community sites, sticking your blogs together or anything else you want to hack together with data sources.

Versatility is a philosophy planet.js wants to abide by. This means various ways of getting hold of data, various ways of manipulating it and various ways of outputting it.

##Development##

Current development aim:

* Intergrate OAuth and a Twitter processing module

##Getting started##
Please note directories set in planet.js start from the system root `/planetjs` (This is just for my testing environment) 

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

Activities : `core/Activities.js`  

> Creates Polling objects. These objects are derived using the `aggregations.json` configuration file. Polling objects follow a routine which involves 1) Fetching data. 2) Parsing it. 3) Checking it for processing.  4) Storing it in the database. All using the appropriate components.

Fetch : `core/Fetcher.js`  

> Responsible for getting data. Currently supports HTTP GET.  

Parser : `core/Parser.js`  

> Takes in data and parses it to the requested type. It does this by specific parsing modules found in `/parsers`  

Store : `core/Store.js`  

> Component responsible for storing data to the MongoDB database.  

####Lesser component(s)####

Log : `core/Log.js`  

> Component for logging to the console with associated error levels.  


##Developer blogs##
* [http://planetjs.tumblr.com/](http://planetjs.tumblr.com) &mdash; Development blog

* [http://planetjsresearch.tumblr.com/](http://planetjsresearch.tumblr.com) &mdash; Research blog