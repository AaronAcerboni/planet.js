var methods = require('./methods').methods;

function route(request, response){
  var verb     = request.method,
      mime     = request.headers["content-type"] || 'text/html',
      tokens   = request.url.substr(1).split("/"),
      resource = tokens[0] || '/';

  tokens.splice(0, 1);

  methods[verb]({
    response: response,
    resource: ruleCheck(resource),
    mime: mime,
    params: tokens
  });
}

// Route overrides

var rules = {
  '/': 'feeds',
  '': 'feeds',
  'favicon.ico': 'public'
};

function ruleCheck(slug) {
  var targets = Object.keys(rules);
  for (var i = 0; i < targets.length; i++) {
    if(targets[i] == slug){
      return rules[targets[i]];
    }
  };
  return slug;
}


exports.route = route;