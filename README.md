#Planet.js#
Planet.js is a JavaScript feed aggregator based of Planet software. Planet.js aims to be an easy to use server framework for websites which are data-driven or similar to Planet sites.  

In time Planet.js will aim to provide plugins and themes to enhance websites built with Planet JS. All accessible from an admin/configuration panel.  

##Development##

Current development aim:

* Derive storing procedure and data structure.  

##Getting started##
Please note directories set in planet.js start from the system root `/planetjs` (This is just for my testing environment) 

###Versions and Dependencies###
Tested on Node v0.4.12 & v0.4.9

* Node v0.4.12 (reccomended)
* MongoDB

Provided modules:

* [mongoose](https://github.com/LearnBoost/mongoose) v2.3.3
* [underscore](http://documentcloud.github.com/underscore/) v1.2.1
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) v0.1.11
* [jasmine-node](https://github.com/pivotal/jasmine) v1.0.12 (unit tests not yet implemented &mdash; sorry!)

###Components / Modules###
Server : `server.js`  

> Starts up the planet.js server. This involves the main HTTP listening loop, and code which starts up the polling activities.  

Activities : `core/Activities.js`  

> Creates Polling objects. These objects are derived using the `aggregations.json` configuration file. Polling objects follow a routine which involves 1) Fetching data. 2) Parsing it. 3) Checking it for processing.  4) Storing it in the database. All using the appropriate components.

Fetch : `core/Activities.js`  

> Responsible for getting data. Currently supports HTTP GET.  

Parser : `core/Parser.js`  

> Takes in data and parses it to the requested type. It does this by specific parsing modules found in `/parsers`  

Store : `core/Store.js`  

> Component responsible for storing data to the MongoDB database.  

####Lesser component(s)####

DirMap : `core/DirMap.js`  

> Component for mapping string identifiers to a directory within planet.js. Will probably be depricated and functionality moved to a standard `router` component.  


##Developer blogs##
* [http://planetjs.tumblr.com/](http://planetjs.tumblr.com) &mdash; Development blog

* [http://planetjsresearch.tumblr.com/](http://planetjsresearch.tumblr.com) &mdash; Research blog