var expect = require('expect');
var {User} = require('./users');

describe('Users',() => {
  var users;

  beforeEach(() => {
      users = new User();
      users.users = [{
        id : '1',
        name : 'Surya',
        room : 'AR'
      },{
        id : '2',
        name : 'Ipsita',
        room : 'VR'
      },{
        id : '3',
        name : 'Rath',
        room : 'AR'
      }];
  });

  it('should add the user into the array',() => {
    var users = new User();
    var user = {
      id : 123,
      name : 'Surya',
      room : 'Java Professors'
    }

    var resUser = users.addUser(user.id, user.name , user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user',() => {
    var userId = '1'
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user',() => {
    var userId = '13'
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3)
  });

  it('should find the user',() => {
    var user = users.getUser('2');

    expect(user).toEqual(users.users[1]);
  });

  it('should not find the user',() => {
    var user = users.getUser('13');

    expect(user).toBeFalsy();
  });

  it('should return the names of AR room only',() => {
    var usersList = users.getUserList('AR');

    expect(usersList).toEqual(['Surya','Rath']);
  });

  it('should return the names of VR room only',() => {
    var usersList = users.getUserList('VR');

    expect(usersList).toEqual(['Ipsita']);
  });
});
