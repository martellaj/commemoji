import getEmoji = require('../source/get_emoji');

describe('tests the random function', function () {
  it('returns an emoji for random get', function () {
    var result = getEmoji.random();
    expect(result).toMatch(/:.*: /);
  });
});
