const multer = require('multer');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express'),
router = express.Router();

const Scrapbook = require('../models/scrapbook_model');
let File = require('../models/file_model');
const User = require("../models/user_model");
const Comments = require("../models/comment_model");

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

router.post('/upload/photo', privateUpload.any(), async(request, response) => {
  console.log("/upload/photo route");
  //const file = request.files[0];
  const file = request.files[0];
  const scrapbook = request.body.scrapbookName;

  if (!file) {
    const error = {
    'httpStatusCode' : 400,
    'message':'Please upload a file'
     }
    response.send(error);
  }

  let photoLocations=[];
  let fileURL = await File.uploadFile(file);
  photoLocations.push(fileURL);
  Scrapbook.addImage(scrapbook, fileURL);

  //this does not send the USER DATA
  response.render("views/edit", {
    scrapbooks: Scrapbook.getScrapbook(),
    scrapbookName: scrapbook,
    users: User.getUser(),
    userID: request.user._json.email
  });
})

router.post('/createScrapbook', async function(request, response) {
  let scrapbookName = request.body.scrapbookName;
  let userID = request.user._json.email;
  let users = User.getUser();
  let userScrapbooks = users[userID]["scrapbooks"];

  function hasWhiteSpace(s) {
    return s.includes(' ')
  }

  if (userScrapbooks.includes(scrapbookName)){
    console.log("you can't reuse this name");

  } else if (scrapbookName.includes(" ")){
    console.log("you can't have spaces in your scrapbook name");

  } else{
    Scrapbook.createNewScrapbook(userID, scrapbookName);
    User.updateUser(userID, scrapbookName);
    Comments.newScrapbook(userID, scrapbookName);

  }
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.redirect("gallery");

});


module.exports = router
