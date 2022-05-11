const multer = require('multer');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express'),
router = express.Router();

const Scrapbook = require('../models/scrapbook_model');
let File = require('../models/file_model');
const User = require("../models/user_model");

// SET STORAGE
let privateStorage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, './uploads')
  },
  filename: function (request, file, cb) {
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
  }
});
let privateUpload = multer({ storage: privateStorage });

router.post('/upload/photo', privateUpload.single('picture'), async(request, response) => {
  console.log("/upload/photo route");
  //const file = request.files[0];
  const file = request.file;
  console.log(file);

  if (!file) {
    const error = {
    'httpStatusCode' : 400,
    'message':'Please upload a file'
     }
    res.send(error);
  }
  let photoLocations=[];
  let fileURL = await File.uploadFile(file);
  photoLocations.push(fileURL);

  Scrapbook.addImage("hey hey", fileURL);
  //this does not send the USER DATA
  response.render("views/edit", {
    scrapbooks: Scrapbook.getScrapbook(),
    users: User.getUser()
  });
})

router.post('/createScrapbook', async function(request, response) {
  let scrapbookName = request.body.scrapbookName;
  let userID = request.user._json.email;

  Scrapbook.createNewScrapbook(userID, scrapbookName);
  User.updateUser(userID, scrapbookName);

  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.redirect("edit");
});

router.get('/gallery', function(request, response) {
  if(request.user){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("views/gallery", {
      request: request,
      scrapbooks: Scrapbook.getScrapbook()
    });
  }else{
    response.redirect('/');
  }
});

module.exports = router
