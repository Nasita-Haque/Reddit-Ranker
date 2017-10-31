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
      var books= [];
      var json = {ranking: "", num_of_votes: "", title:""};

      $(".expando").filter(function(){


        var data = $(this).find("td");
        console.log('VALUE', data.first().text())

        for(var i = 0; i < data.length; i++){

          console.log("books=>", books)
          if ( i % 3 === 0){

          books.push({ranking: data.eq(i).text(), num_of_votes: data.eq(i+1).text(), title: data.eq(i+2).text()})
          }
          
        }

      })
    }

  fs.writeFile("output json", JSON.stringify(books, null, 4), function(err){
   console.log("File successfully written! - Check your project directory for the output.json file");
  })

  res.send('Check your console');

 })

});

var port = 4000

app.listen(port);

console.log(`Listening on ${port}`);

exports = module.exports = app;