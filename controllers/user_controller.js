const express = require('express'),
router = express.Router();

const User = require('../models/user_model');
const Scrapbook = require('../models/scrapbook_model');
const Comments = require('../models/comment_model');


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

router.post("/saveCtoS", function(request, response) {
  let scrapbookName = request.body.scrapbookName;
  console.log("Save comment " + scrapbookName);

  let userID = request.user._json.email;
  let user = User.getUser(request.user._json.email);
  let comment = request.body.comment;
  console.log("Save comment " + comment);

  console.log("usercontroller " + comment);
  console.log("usercontroller " + scrapbookName);
  Comments.saveComment(scrapbookName, userID, comment);

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("views/comments", {
    comments: Comments.getComments(),
    userID: request.user._json.email,
    users: User.getUser(),
    userFirstName: user[request.user._json.email].userFirstName,
    scrapbooks: Scrapbook.getScrapbook(),
    scrapbookName: scrapbookName
  });
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
    comments: Comments.getComments(),
    userID: request.user._json.email,
    users: User.getUser(),
    userFirstName: user[request.user._json.email].userFirstName,
    scrapbooks: Scrapbook.getScrapbook(),
    scrapbookName: scrapbookName
  });
});

module.exports = router
