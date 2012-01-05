Planet.js is a JavaScript data aggregator in the spirit of Planet software. It aims to be a server environment for creating and managing sites which are data driven.

##Getting started##

`node server.js`

Currently planet.js can aggregate data and has a simple URL router setup. 

eg. `localhost:8888/feeds or localhost:8888/`  

or `localhost:8888/[aggregationname]/[year]/[month]`

###Setup###

- **Think about your testing location.** All require statements are written to look for `"/planet.js"`. So stick a `planet.js` directory in your root if you want to get up and running quickly. 

- **Setup your MongoDB database.** By default planet.js looks for the `test` database. That is referenced in `core/store.js` & `core/router.js`.

- **Prepare your aggregations.** By default the `aggregations.json` config looks at the planet.js research & development blogs, gawker for RSS and listens out for tweets using twitter account planetjstest. 


###Versions and Dependencies###

Tested on Node v0.4.12 & v0.4.9

* Node v0.4.12 (reccomended)
* MongoDB

Provided modules:

* [mongouse](https://github.com/amark/mongous) v0.1.0
* [underscore](http://documentcloud.github.com/underscore/) v1.2.1
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) v0.1.11
* [jasmine-node](https://github.com/pivotal/jasmine) v1.0.12


##API Docs##

[Planet.js API Documentation](http://aaronacerboni.github.com/planet.js/docs/)

##Project Aim##

The magic of planet.js is the ability to synchronise a variety of data ranging from standard RSS to any old web service. Possible use cases are for community sites, sticking your blogs together or anything else you want to hack together with data sources.

Versatility is a philosophy planet.js wants to abide by. This means various ways of getting hold of data, various ways of manipulating it and various ways of outputting it.

See [TODO](https://github.com/AaronAcerboni/planet.js/blob/master/TODO.md)

##Other links##
* [http://planetjs.tumblr.com/](http://planetjs.tumblr.com) &mdash; Development blog

* [http://planetjsresearch.tumblr.com/](http://planetjsresearch.tumblr.com) &mdash; Research blog

* [Github page](http://aaronacerboni.github.com/planet.js/)