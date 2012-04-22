var FeedParser = require('feedparser');

function main(options, nextProcess) {
    var articles = [],
        entries  = [],
        feedParser = new FeedParser();

    feedParser.on('article', function (article) {
        articles.push(article);
    })
    .on('end', function () {
        articles.forEach(function (item) {
            entries.push({
                date: new Date(item.pubDate || item.pubdate),
                source_name: item.meta.title,
                source_link: item.meta.link,
                data: {
                        title: item.title,
                        author_name: item.author || item.meta.title,
                        author_id: null,
                        text_summary: item.description.substr(0, 240) + '...',
                        text_full: item.description,
                        link: item.link,
                        main_image: item.meta.image.url,
                        location: null
                }
            });
        });
        nextProcess(entries);
    });
    feedParser.parseUrl(options.resources.url);
}

exports.main = main;