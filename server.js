var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

  url = "https://www.reddit.com/r/Fantasy/comments/6wddcu/the_rfantasy_top_novels_poll_2017_now_with_star/"

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html);
      var ranking, num_of_votes, title;
      var json = {ranking: "", num_of_votes: "", title:""};

      $(".expando").filter(function(){

        var data = $(this).find("td");

        ranking = data.first().text();
        json.ranking = ranking;

        num_of_votes = data.eq(1).text();
        json.num_of_votes = num_of_votes;

        title = data.eq(2).text();
        json.title = title;

      })
    }

  fs.writeFile("output json", JSON.stringify(json, null, 4), function(err){
   console.log("File successfully written! - Check your project directory for the output.json file");
  })

  res.send('Check your console');

 })

});

var port = 4000

app.listen(port);

console.log(`Listening on ${port}`);

exports = module.exports = app;