const _ = require('lodash');

class User {
  constructor(){
    this.users = [];
  }

  addUser(id , name , room){
    var user = {
      id,
      name,
      room
    }
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var user = this.getUser(id);

    if(user){
      this.users = this.users.filter((user) => user.id !== id);     //  store users whose id doesn't match with the argument id
    }

    return user;
  }

  getUser(id){
    var index = _.findIndex(this.users,{'id': id});
    return this.users[index];
  }

  getUserList(room){
    var users = this.users.filter((user) => user.room === room);    //  Filter out the user having same rooms
    var nameArray = users.map((user) => user.name);                 //  create array of names from users array by mapping the name property

    return nameArray;
  }
}

module.exports = {User};

/****************************************Lodash**************************************************/
// _.findIndex(arrayName,{'id' : id}); //if not found -1
