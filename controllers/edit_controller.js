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
  let pageNumber = request.body.currentPageNumber;
  let backgroundColor = request.body.currentBackgroundColor;
  let fontColor = request.body.currentFontColor;
  let font = request.body.currentFont;

  console.log("save" + scrapbookName);
  console.log("save" + pageNumber);
  console.log("save" + backgroundColor);
  console.log("save" + fontColor);
  console.log("save" + font);

  Scrapbook.saveScrapbook(scrapbookName, pageNumber, backgroundColor, fontColor, font); // scrapbookName, pageNumber, backgroundColor, images, fontColor, font

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.redirect("edit");
});


module.exports = router
