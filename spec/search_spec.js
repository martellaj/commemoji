/* global describe, expect, it */

describe('emoji searches', function () {
  it('returns an expected result of "fire" search', function () {
    var getEmoji = require('../get_emoji')({
      S: true
    });

    var result = getEmoji.search('fire').trim();
    var expectedResults = [':fire:', ':fireworks:', ':fire_engine:', ':name_badge:', ':sparkle:'];

    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });

  it('returns a result for a search with no matches', function () {
    var getEmoji = require('../get_emoji')({
      S: true
    });

    var result = getEmoji.search('bagel');

    expect(result).not.toBe(null);
  });
});
