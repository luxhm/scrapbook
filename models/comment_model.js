const fs = require('fs');

exports.getComments = function(){
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/comments.json'));
  return comments;
}

exports.saveComment = function(scrapbook, commenter, comment){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/comments.json'));

  comments[scrapbook]["comments"].push(comment);
  fs.writeFileSync(__dirname+'/../data/comments.json', JSON.stringify(comments));
}

exports.newScrapbook = function (userID, scrapbookName){
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/comments.json'));

  if(!comments[scrapbookName]){
    let newScrapbook={
      "creator": userID,
      "comments": []
    }
    comments[scrapbookName] = newScrapbook;
  }

  fs.writeFileSync(__dirname+'/../data/comments.json', JSON.stringify(comments));
}
