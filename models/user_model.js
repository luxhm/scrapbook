const fs = require('fs');
const axios = require('axios'); //install with npm install axios

exports.getUser = function(){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  return users;
}

exports.createUser =  function (userID, userFirstName){
  let users = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  if(!users[userID]){
    let newUser={
      "userFirstName": userFirstName,
      "scrapbooks": []
    }
    users[userID] = newUser;
    fs.writeFileSync(__dirname+'/../data/users.json', JSON.stringify(users));
  }
}

exports.updateUser = function (scrapbookName){
  //this will save the new scrapbooks that the user creates to their profile
}
