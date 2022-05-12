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
      userFirstName: user[request.user._json.email].userFirstName,
      scrapbooks: Scrapbook.getScrapbook(),
      scrapbookName: "firstScrapbook"
    });
  }else{
    response.redirect('/');
  }
});

module.exports = router
