const express = require('express'),
router = express.Router();

const User = require('../models/user_model');
const Scrapbook = require('../models/scrapbook_model');

router.get('/edit', function(request, response) {
  if(request.user){
    let user = User.getUser(request.user._json.email);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("views/edit", {
      userFirstName: user[request.user._json.email].Name,
      scrapbooks: Scrapbook.getScrapbook(),
      scrapbookName: "firstScrapbook"
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

router.post('/saveScrapbook', function(request, response) {
  let scrapbookName = request.body.scrapbookName;
  let pageNumber = request.body.pageNumber;
  let backgroundColor = request.body.backgroundColor;
  let images = request.body.images;
  let fontColor = request.body.fontColor;
  let font = request.body.font;

  let userID = request.user._json.email;

  Scrapbook.saveScrapbook(scrapbookName, pageNumber, backgroundColor, images, fontColor, font); // scrapbookName, pageNumber, backgroundColor, images, fontColor, font

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.redirect("edit");
});


module.exports = router
