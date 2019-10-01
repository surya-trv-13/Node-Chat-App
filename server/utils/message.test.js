var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('GenerateMessage',() => {
  it('should return a object',() => {
      var from = 'IJenny';
      var text = 'I love you';
      var message = generateMessage(from,text);

      expect(message).toMatchObject({
        from,
        text
      });
      expect(typeof message.createdAt).toBe('number');
    });
  });


describe('generateLocationMessage',() => {
  it('should return right url',() => {
    var from = 'IJenny';
    var latitude = 1;
    var longitude = 2;
    var location = generateLocationMessage(from,latitude,longitude);

    expect(location).toMatchObject({
      from,
      url : 'https://www.google.com/maps?q=1,2'
    });
    expect(typeof location.createdAt).toBe('number');
  });
});
