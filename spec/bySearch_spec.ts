import getEmoji = require('../source/get_emoji');

describe('tests the bySearch function', function () {
  it('returns an expected result of "fire" search', function () {
    var result = getEmoji.bySearch('fire').trim();
    var expectedResults = [':fire:', ':fireworks:', ':fire_engine:', ':name_badge:', ':sparkle:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });

  it('returns a result for a search with no matches', function () {
    var result = getEmoji.bySearch('bagel');
    expect(result).toBe(null);
  });
});
