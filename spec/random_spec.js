/* global describe, expect, it */

describe('tests the random function', function () {
  it('returns an emoji for random get', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.random();
    expect(result).toMatch(/:.*: /);
  });
});
