const multer = require('multer');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express'),
router = express.Router();

const Scrapbook = require('../models/scrapbook_model');

// SET STORAGE
let File = require('../models/file_model')

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


/*
let publicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
  }
});
let publicUpload = multer({ storage: publicStorage });
*/

//Uploading to a public static folder
/*router.post('/upload/photo', publicUpload.single('picture'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = {
    'httpStatusCode' : 400,
    'message':'Please upload a file'
     }
    res.send(error);
  }
  res.render('views/confirmation',{
    photoLocation: "/images/"+file.filename
  });
})*/

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
  response.render('views/confirmation',{
    photoLocations: photoLocations
  });
})
/*
app.post('/uploadfile', privateUpload.any(), async (request, response) => {
  console.log("/uploadfile route");
  const file = request.files[0];
  console.log(file);
  console.log(request.body.message);

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
  response.render('confirmation',{
    photoLocations: photoLocations
  });
});
*/

module.exports = router
