var expect = require('expect');
var {generateMessage} = require('./message');

describe('GenerateMessage',() => {
  it('should return a object',() => {
      var from = 'IJenny';
      var text = 'I love you';
      var message = generateMessage(from,text);

      expect(message).toMatchObject({
        from,
        text
      })
      expect(typeof message.createdAt).toBe('number');
    });
  });
