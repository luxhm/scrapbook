const express = require('express'),
router = express.Router();
const axios = require('axios'); //install with npm install axios


const User = require('../models/user_model');
const Scrapbook = require('../models/scrapbook_model');

router.get('/edit', function(request, response) {
  if(request.user){
    let user = User.getUser(request.user._json.email);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("views/edit", {
      userID: request.user._json.email,
      users: User.getUser(),
      scrapbooks: Scrapbook.getScrapbook()
    });
  }else{
    response.redirect('/');
  }
});

router.get('/comments', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("views/comments");
});

router.post('/saveScrapbook', async function(request, response) { //this is all undefined -- figure out how to save these variables from model
  let scrapbookName = request.body.scrapbookName; //these are all undefined
  let pageNumber = request.body.currentPageNumber;
  let backgroundColor = request.body.backgroundSelector;
  let fontColor = request.body.fontColorSelector;
  let font = request.body.fontSelector;

  console.log("save " + scrapbookName);
  console.log("save " + pageNumber);
  console.log("save " + backgroundColor);
  console.log("save " + fontColor);
  console.log("save " + font);

  Scrapbook.saveScrapbook(scrapbookName, pageNumber, backgroundColor, fontColor, font); // scrapbookName, pageNumber, backgroundColor, images, fontColor, font

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.redirect("edit");
});


module.exports = router
