/* global describe, expect, it */

describe('emoji searches', function () {
  it('returns an expected result of "fire" search', function () {
    var emoji = require('../emoji')({
      S: true,
      args: [null, 'fire']
    });

    var result = emoji.getEmoji().trim();
    var expectedResults = [':fire:', ':fireworks:', ':fire_engine:', ':name_badge:', ':sparkle:'];

    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });

  it('returns a result for a search with no matches', function () {
    var emoji = require('../emoji')({
      S: true,
      args: [null, 'bagel']
    });

    var result = emoji.getEmoji();

    expect(result).not.toBe(null);
  });
});
