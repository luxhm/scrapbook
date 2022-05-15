const fs = require('fs');

exports.getScrapbook = function(){
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  return scrapbooks;
}

exports.saveScrapbook = function(userID, scrapbookName, pageNumber, backgroundColor, fontColor, font){
  //saves the new scrapbook to the scrapbooks json
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let allScrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));

  let myScrapbook = allScrapbooks[scrapbookName]; //this is undefined rn SCRAPBOOK NAME is undefined
  console.log('userID ' + userID);
  let usersScrapbook = users[userID].scrapbooks;
  console.log(usersScrapbook);
  console.log(pageNumber);
  console.log(myScrapbook);

  myScrapbook["1"].backgroundColor = backgroundColor;
  myScrapbook["1"].fontColor = fontColor;
  myScrapbook["1"].font = font;

  console.log(myScrapbook["1"]);

  fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(allScrapbooks));
}

exports.addImage = function(scrapbookName, image){
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  scrapbooks[scrapbookName]["1"]["images"].push(image);
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
        "backgroundColor": "#FFFFFF" ,
        "fontColor": "#000000",
        "font": "Outfit"
      }
    }
    scrapbooks[scrapbookName] = newScrapbook;
    fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));
  }
}
