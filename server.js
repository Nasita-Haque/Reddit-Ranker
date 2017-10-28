var express = require('express');
var fs = require('fs');
var request = require('request');
var app = express();

app.get('/scrape', function(req, res){

  url = "https://www.reddit.com/r/Fantasy/comments/6wddcu/the_rfantasy_top_novels_poll_2017_now_with_star/"

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html);
      var ranking, num_of_votes, ranking;
      var json = {raning: "", num_of_votes: "", ranking""};

      $.(".expando").filter(function(){

        var data = $(this);
        ranking = data.find("tbody").first().next().text();

        json.ranking = ranking;
      })
    }

  })
});

var port = 4000

app.listen(port);

console.log(`Listening on ${port}`);

exports = module.exports = app;