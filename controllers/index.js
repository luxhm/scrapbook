const express = require('express'),
router = express.Router();

router.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("views/index", {
    request: request
  });
});

module.exports = router
