/*
  Uploads file to a single Google Drive folder using a service account
  https://www.daimto.com/upload-image-to-google-drive-with-node-js/
  Don't forget to give the service account edit access to the folder
  and enable View access to anyone on the internet
*/
const fs = require('fs');
const {google} = require('googleapis');

// service account key file from Google Cloud console.
const KEYS = __dirname+"/../config/keys2.json";

// Request full drive access.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// Create a service account initialize with the service account key file and scope needed
const auth = new google.auth.GoogleAuth({
    keyFile: KEYS,
    scopes: SCOPES
});

//parents may need to change
const driveService = google.drive({version: 'v3', auth});

let fileMetadata = {
  'name': Date.now()+'_image.png',
  'parents':  ['1qsaneNeJwaLhXN-MgMEBAbWVskCbmnoR']
};


exports.uploadFile = async function(file) {
  let scrapbooks = JSON.parse(fs.readFileSync('data/scrapbooks.json'));
  let fileURL = "";
  let filePath = __dirname+"/../"+file.path;

  let media = {
       mimeType: 'image/jpeg',
       body: fs.createReadStream(filePath)
   };
   let response = await driveService.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
   });

   switch(response.status){
    case 200:
        fileURL = "https://drive.google.com/uc?export=view&id="+response.data.id;
        console.log(fileURL)
        console.log('Created File Id: ', response.data.id);
        break;
    default:
        console.error('Error creating the file, ' + response.errors);
        break;
  }
  return fileURL;
}

exports.uploadFiles = async function(files) {
  let fileURLs = [];

  for(let i=0; i<files.length; i++){
   let fileURL = await exports.uploadFile(files[i]);
   fileURLs.push(fileURL);
  }

  return fileURLs;
}
