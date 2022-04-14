//..............Include Express..................................//
const express = require('express');
const ejs = require('ejs');

//..............Create an Express server object..................//
const app = express();

//..............Apply Express middleware to the server object....//
app.use(express.json()); //Used to parse JSON bodies (needed for POST requests)
app.use(express.urlencoded());
app.use(express.static('public')); //specify location of static assests
app.set('views', __dirname ); //specify location of templates
app.set('view engine', 'ejs'); //specify templating library

app.use(require('./controllers/index'));
app.use(require('./controllers/user_controller'));

/*
app.get('/', function(request, response) {
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("views/index");
});*/

app.use("", function(request, response) {
  response.redirect('/error?code=400');
});

//..............Start the server...............................//
const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started at http://localhost:'+port+'.')
});