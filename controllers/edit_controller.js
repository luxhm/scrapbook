const express = require('express'),
router = express.Router();

const User = require('../models/user_model');

router.get('/edit', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("views/edit");
});

module.exports = router
