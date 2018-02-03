const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scrape', function(req, res){

  const url = "https://www.reddit.com/r/Fantasy/comments/6wddcu/the_rfantasy_top_novels_poll_2017_now_with_star/"

  request(url, function(error, response, html){

    if(!error){
      let $ = cheerio.load(html);
      let ranking, num_of_votes, title;
      let books= [];
      let json = {ranking: "", num_of_votes: "", title:""};

      $(".expando").filter(function(){
        let data = $(this).find("td");

        for(let i = 0; i < data.length; i++){

          if ( i % 3 === 0){

          books.push({
              ranking: data.eq(i).text(), 
              num_of_votes: data.eq(i+1).text(), 
              title: data.eq(i+2).text()
            })
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

let port = 4000

app.listen(port);

console.log(`Listening on ${port}`);

exports = module.exports = app;
