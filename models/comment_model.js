exports.getComments = function(){
  let comments = JSON.parse(fs.readFileSync(__dirname+'/../data/comments.json'));
  return comments;
}

exports.saveComment = function(scrapbook, user, comment){
  //saves the new comment to the comments json
}
