exports.getScrapbook = function(){
  let scrapbooks = JSON.parse(fs.readFileSync(__dirname+'/../data/scrapbooks.json'));
  return scrapbooks;
}

exports.saveScrapbook = function(scrapbookOject){
  //saves the new scrapbook to the scrapbooks json
}

exports.updateScrapbook = function(scrapbookObject){
  //updates an old scrapbook in the scrapbooks json
}

exports.createNewsScrapbook = function(user){
  
}
