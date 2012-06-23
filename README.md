# Not for general consumption. Move on for now.

Planet.js is a JavaScript data aggregator in the spirit of Planet software. It aims to be a server environment for creating and managing sites which are data driven.

##Getting started##

`node server.js`

Currently planet.js can aggregate data and has a simple URL router setup.

eg. `localhost:8888/`

or `localhost:8888/feeds`

or `localhost:8888/feeds/all/[year]/[month]`

or `localhost:8888/feeds/[aggregationname]/[year]/[month]`

###Setup###

- **Setup your MongoDB database.** By default planet.js looks for the `test` database. That is referenced in `core/store.js` & `core/methods.js`.

- **Prepare your aggregations.** By default the `aggregations.json` config looks at the planet.js research & development blogs for RSS and listens out for tweets using twitter account planetjstest.


###Versions and Dependencies###

- Node v0.6.9 (also 4.12)
- MongoDB v2.0.2

**Core modules**

* [mongojs](https://github.com/gett/mongojs) v0.2.6
* [underscore](http://documentcloud.github.com/underscore/) v1.2.1
* [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) v0.1.11

**Processing / Template modules**

* [mustache](https://github.com/janl/mustache.js/) v0.3.1-dev
* [twitter-node](https://github.com/technoweenie/twitter-node)
* [pos](https://github.com/fortnightlabs/pos-js)

##Project Aim##

The magic of planet.js is the ability to synchronise a variety of data ranging from the standard RSS to any old web service.

Versatility is a philosophy planet.js wants to abide by. This means developing an open environment for allowing for various ways of getting hold of data, various ways of manipulating it and various ways of outputting it.

Planet.js also doesn't have to just grab data from the present. Collecting data from web services also gives us the opportunity to aggregate from the past too.

Possible use cases are for community sites, subject interests, sticking your blogs together or anything else you want to hack together with data.

See [TODO](https://github.com/AaronAcerboni/planet.js/blob/master/TODO.md)

##Links##
* [http://planetjs.tumblr.com/](http://planetjs.tumblr.com) &mdash; Development blog

* [http://planetjsresearch.tumblr.com/](http://planetjsresearch.tumblr.com) &mdash; Research blog