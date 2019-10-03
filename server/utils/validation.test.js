var expect = require('expect');
var {isRealString} =require('./validation');

describe('isRealString',() => {
  it('Should return true for valid string',() => {
    var str = 'snr';
    var result = isRealString(str);

    expect(result)
     .toBe(true);
  });

  it('should return false for empty string',() => {
    var str = '';
    var result = isRealString(str);

    expect(result)
     .toBe(false);
  });

  it('should return false for non-string',() => {
    var str = 123;
    var result = isRealString(str);

    expect(result)
     .toBe(false);
  });
});
