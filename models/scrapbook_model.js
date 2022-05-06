const fs = require('fs');

exports.getScrapbook = function(){
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  return scrapbooks;
}

exports.saveScrapbook = function(scrapbookObject){
  //saves the new scrapbook to the scrapbooks json
}

exports.updateScrapbook = function(scrapbookObject){
  //updates an old scrapbook in the scrapbooks json
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));

  //const newPage = new Object();
}

exports.addImage = function(scrapbookName, image){
  console.log(scrapbookName);
  console.log(image);
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  scrapbooks[scrapbookName]["Page1"]["Images"].push(image);
  console.log(scrapbooks[scrapbookName]["Page1"]["Images"]);
  fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));

}

exports.createNewScrapbook = function(userID, scrapbookName){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));

  if(!scrapbooks[scrapbookName]){
    let newScrapbook={
      "Name": userFirstName,
      "User": users[userID],
      "Page": {
        "Page number": 1,
        "Images": [],
        "Background color": "" ,
        "Font color": "",
        "Font": ""
      }

    }
    scrapbooks[scrapbookName] = newScrapbook;
    fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));
  }
}
exports.createNewScrapbook = function(user){

}
