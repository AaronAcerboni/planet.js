var pos = require('pos');

function main(feeds, callback){
  if(feeds.length){
    for(var i = 0; i < feeds.length; i++){
      (new Tagging()).getPopularWords(feeds[i].data.text_full, function(nouns){
        feeds[i].data.tags = nouns;
      });
    }
  } else {
      (new Tagging()).getPopularWords(feeds.data.text_full, function(nouns){
        feeds.data.tags = nouns;
      });
  }
  callback(feeds);
}

function Tagging(){
  var that  = this,
      tags  = null,
      words = null;

  this.getPopularWords = function(string, callback){
    var nouns = [];

    if(string){
      words = new pos.Lexer().lex(stripHTML(string));
      tags  = new pos.Tagger().tag(words);
    } else if (tags == null){
      console.log('No data provided!');
    }

    for (var i = tags.length - 1; i >= 0; i--) {
      if(tags[i][1].match("^N.*$")){
      // if(tags[i][1].match("^NNS|NNP$")){
        nouns.push(tags[i][0]);
      }
    };

    unique(nouns, callback);
  };

  this.getURLs = function(string, callback){
    var urls = [];

    if(string){
      words = new pos.Lexer().lex(string);
      tags  = new pos.Tagger().tag(words);
    } else if (tags == null){
      console.log('No data provided!');
    }

    for (var i = tags.length - 1; i >= 0; i--) {
      if(tags[i][1].match("^URL$")){
        urls.push(tags[i][0]);
      }
    };

    unique(nouns, callback);
  };

  function unique(origin, fn){
    var a = [],
        l = origin.length;
        for(var i=0; i<l; i++) {
          for(var j=i+1; j<l; j++) {
            if (origin[i] === origin[j])
              j = ++i;
          }
          a.push(origin[i]);
        }
    fn(a);
  }

}

function stripHTML(string){
  return string.replace(/<(?:.|\n)*?>/gm, '');
}

exports.main = main;

/*

Usage

var tagger = new Tagging();

tagger.getPopularWords("hello world my name is aaron", function(tags){
  console.log(tags);
});

tagger.getURLs("my favourite website is www.google.com", function(tags){
  console.log(tags);
});

*/