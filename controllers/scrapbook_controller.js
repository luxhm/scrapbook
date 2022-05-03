const multer = require('multer');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express'),
router = express.Router();

const Scrapbook = require('../models/scrapbook_model');

// SET STORAGE
//defines the destination for private
let privateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now()+'-'+file.originalname.replace(' ', '-'));
    //renames the file to make it more specific
  }
});
let privateUpload = multer({ storage: privateStorage });

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

//Uploading to a public static folder
router.post('/upload/photo', publicUpload.single('picture'), (req, res, next) => {
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
})


module.exports = router
