const express = require('express'),
router = express.Router();

const User = require('../models/user_model');

/*
router.get('/astrologyEntry', loggedIn, function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render("user/astrologyEntry", {
    user: request.user,
    data: User.getUser(),
  });
});
*/

module.exports = router
