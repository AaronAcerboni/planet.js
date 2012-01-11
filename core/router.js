var methods = require('/planet.js/core/methods'),
    dispatch = require('dispatch');


// // Routes

function handle(req, res, next, token2, token3, token4){
  // res.write("t1" + token1);
  res.writeHead(200, {"content-type" : "text/html"});
  res.write("</br> t2 " + token2);
  res.write("</br> t3 " + token3);
  res.write("</br> t4 " + token4);
  res.end();
}

exports.route = dispatch({
  "/" : {
    ""                          : function(){console.log("/")},
    ":aggregation"              : function(){console.log("/aggregation")},
    ":aggregation/:year"        : function(){console.log("/aggregation/year")},
    ":aggregation/:year/:month" : function(){console.log("/aggregation/year/month")}
  }
});

// /         
// /  }

// /all/2012
// /all/2012/12

// /custom
// /custom/2012
// /custom/2012/12