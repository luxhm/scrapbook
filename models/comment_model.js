exports.getComments = function(){
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/comments.json'));
  return comments;
}

exports.saveComment = function(user, comment){ // add scrapbookName after
  //saves the new comment to the comments json
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/comments.json'));

  comments[scrapbookName]["comments"].push(comment);
  fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(users));
}
