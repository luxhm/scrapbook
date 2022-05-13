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

  Object.keys(myScrapbook[pageNumber]).forEach(key => {
    myScrapbook[pageNumber][key] = '';
  });

  myScrapbook[pageNumber].backgroundColor = backgroundColor;
  myScrapbook[pageNumber].fontColor = fontColor;
  myScrapbook[pageNumber].font = font;
  console.log(myScrapbook[pageNumber]);

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
        "backgroundColor": "#FFFFFF" ,
        "fontColor": "#000000",
        "font": "Outfit"
      }
    }
    scrapbooks[scrapbookName] = newScrapbook;
    fs.writeFileSync(__dirname+'/../data/scrapbooks.json', JSON.stringify(scrapbooks));
  }
}
