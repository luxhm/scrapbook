const express = require('express'),
router = express.Router();

const User = require('../models/user_model');
const Scrapbook = require('../models/scrapbook_model');

router.get('/comments', function(request, response) {
  if(request.user){
    let user = User.getUser(request.user._json.email);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("views/comments", {
      userID: request.user._json.email,
      users: User.getUser(),
      userFirstName: user[request.user._json.email].userFirstName,
      scrapbooks: Scrapbook.getScrapbook(),
      scrapbookName: scrapbookName
    });
  }else{
    response.redirect('/');
  }
});

router.get('/gallery', function(request, response) {
  if(request.user){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("views/gallery", {
      request: request,
      userID: request.user._json.email,
      users: User.getUser(),
      scrapbooks: Scrapbook.getScrapbook()
    });
  }else{
    response.redirect('/');
  }
});

router.post("/editFromGallery", function(request, response) {
  let scrapbookName = request.body.scrapbookName;
  let userID = request.user._json.email;
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("views/edit", {
    userID: request.user._json.email,
    users: User.getUser(),
    scrapbooks: Scrapbook.getScrapbook(),
    scrapbookName: scrapbookName
  });
});

router.post("/commentFromGallery", function(request, response) {
  let scrapbookName = request.body.scrapbookName;
  let userID = request.user._json.email;
  let user = User.getUser(request.user._json.email);

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("views/comments", {
    userID: request.user._json.email,
    users: User.getUser(),
    userFirstName: user[request.user._json.email].userFirstName,
    scrapbooks: Scrapbook.getScrapbook(),
    scrapbookName: scrapbookName
  });
});

module.exports = router
