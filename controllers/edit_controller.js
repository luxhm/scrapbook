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


module.exports = router
