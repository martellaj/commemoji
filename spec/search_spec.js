/* global describe, expect, it */

describe('emoji searches', function () {
  it('returns an expected result of "fire" search', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.bySearch('fire').trim();
    var expectedResults = [':fire:', ':fireworks:', ':fire_engine:', ':name_badge:', ':sparkle:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });

  it('returns a result for a search with no matches', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.bySearch('bagel');
    expect(result).not.toBe(null);
  });

  it('returns the expected emoji for "bug" commit type', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.byCommitType('bug');
    expect(result).not.toBe(':bug :');
  });
});
