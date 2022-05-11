const fs = require('fs');

exports.getScrapbook = function(){
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  return scrapbooks;
}

exports.saveScrapbook = function(scrapbookName, pageNumber, backgroundColor, fontColor, font){
  //saves the new scrapbook to the scrapbooks json
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));

  console.log(scrapbooks);
  myScrapbook = scrapbooks[scrapbookName];
  console.log(pageNumber); //undefined
  console.log(myScrapbook); //undefined

  myScrapbook[pageNumber] = {
    "backgroundColor": backgroundColor,
    "fontColor": fontColor,
    "font": font,
  }
}

exports.updateScrapbook = function(scrapbookName, pageNumber){
  //updates an old scrapbook in the scrapbooks json
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));

  let scrapbookObject = scrapbooks[scrapbookName] // = object of scrapbook
  const newPage = new Object();

  scrapbookObject[newPage] = {
    "images": [],
    "backgroundColor": " ",
    "fontColor": " ",
    "font": " ",
  }
}

exports.addImage = function(scrapbookName, image){
  console.log(scrapbookName);
  console.log(image);
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  scrapbooks[scrapbookName]["1"]["Images"].push(image);
  console.log(scrapbooks[scrapbookName]["1"]["Images"]);
  fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));

}

exports.createNewScrapbook = function(userID, scrapbookName){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));

  if(!scrapbooks[scrapbookName]){
    let newScrapbook={
      "User": userID,
      "1": {
        "images": [],
        "backgroundColor": "" ,
        "fontColor": "",
        "font": ""
      }
    }
    scrapbooks[scrapbookName] = newScrapbook;
    fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));
  }
}
