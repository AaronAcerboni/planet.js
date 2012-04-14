var mongojs = require('mongojs'),
    Parser  = require('./parser').Parser,
    build   = require('../templates/build'),
    fs      = require('fs');

var methods = {}, resources = {}, RESPONSES;

methods.GET = function(options) {
    resources[options.resource.toLowerCase()](options.params, options.mime,
        function (responseCode, mime, content) {
            options.response.writeHead(responseCode, {'Content-type': mime});
            if(content) {
                options.response.end(content);
            } else {
                options.response.end('No content returned');
            }
        });
};

methods.POST = function(options) {};

methods.PUT = function(options) {};

methods.DELETE = function(options) {};

methods.POST = function (options) {};

// Hard written resources
// Ideally they can be dynamically generated from mongo collections
// Also they don't belong here in methods.

resources.feeds = function (params, mime, cb) {
    var db = mongojs.connect('test', ['feeds']),
        query = {},
        aggregation = params[0],
        year = params[1],
        month = params[2];

    if(aggregation && aggregation != 'all'){
        query.aggregation = aggregation;
    }

    if(year && month) {
        var start = new Date(parseInt(year), parseInt(month)-1, 1),
            end   = new Date(parseInt(year), parseInt(month)-1, 31);
        query.date = { $gte : start, $lt : end };
    } else if (year) {
        var start = new Date(parseInt(year), 0, 1),
            end   = new Date(parseInt(year)+1, 0, 1);
        query.date = { $gte : start, $lt : end };
    }

    db['feeds'].find(query).sort({date: -1}, respond);

    function respond(err, docs) {
        if(docs.length == 0){
            cb(RESPONSES.resourceNotFound);
        } else {
            if(mime == 'text/html'){
                build.html('feeds', docs, function (html) {
                    cb(RESPONSES.ok, mime, html);
                })
            } else {
                (new Parser()).parse(docs, "application/json", mime, function(data){
                    if(data){
                        cb(RESPONSES.ok, mime, data);
                    } else {
                        cb(RESPONSES.resourceNotFound);
                    }
                });
            }
        }
    }
};

resources.public = function (params, mime, cb) {
    var path = params[0],
        file = params[1],
        type, readAs;

    switch(path){
        case 'images':
            type = 'binary';
        break;
        case 'css':
            readAs = 'utf-8';
            type = 'text/css';
        break;
        case 'js':
            readAs = 'utf-8';
            type = 'text/javascript';
        break;
    }
    type = type || mime;
    fs.readFile('public/' + path + '/' + file, readAs, function (err, data) {
        if(err){
            if(err.errno === 34){
                cb(RESPONSES.resourceNotFound);
            } else {
                cb(RESPONSES.error);
            }
        } else {
            cb(RESPONSES.ok, type, data);
        }
    });
}

// Responses

RESPONSES = {
    ok: 200,
    resourceNotFound: 404,
    unsupportedMediaType: 415,
    unsupportedMethod: 405,
    forbidden: 403,
    error: 500
};

exports.methods = methods;