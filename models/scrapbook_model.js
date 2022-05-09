const fs = require('fs');

exports.getScrapbook = function(){
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  return scrapbooks;
}

exports.saveScrapbook = function(scrapbookName, pageNumber, backgroundColor, images, fontColor, font){
  //saves the new scrapbook to the scrapbooks json
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));

  myScrapbook = scrapbooks[scrapbookName];

  myScrapbook[pageNumber].backgroundColor = backgroundColor;
  myScrapbook[pageNumber].images = images;
  myScrapbook[pageNumber].fontColor = fontColor;
  myScrapbook[pageNumber].font = font;
}

exports.updateScrapbook = function(scrapbookName, pageNumber){
  //updates an old scrapbook in the scrapbooks json
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));

  let scrapbookObject = scrapbooks[scrapbookName] // = object of scrapbook
  const newPage = new Object();

  scrapbookObject[newPage] = {
    "pageNumber": pageNumber++,
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
  scrapbooks[scrapbookName]["Page1"]["Images"].push(image);
  console.log(scrapbooks[scrapbookName]["Page1"]["Images"]);
  fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));

}

exports.createNewScrapbook = function(userID, scrapbookName){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));

  if(!scrapbooks[scrapbookName]){
    console.log("scrapbook is new");
    let newScrapbook={
      "User": userID,
      "Page": {
        "pageNumber": 1,
        "images": [],
        "backgroundColor": "" ,
        "fontColor": "",
        "font": ""
      }
    }
    console.log(newScrapbook);
    scrapbooks[scrapbookName] = newScrapbook;
    fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));
  }
}
