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
    expect(result).toBe(null);
  });

  it('returns the expected emoji for "bug" commit type', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.byCommitType('bug');
    expect(result).toBe(':bug: ');
  });
  
  it('returns the expected emoji for an unknown commit type', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.byCommitType('mumbo');
    expect(result).toBe(null);
  });
  
  it('returns an expected emoji of a simple commit message analysis', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.analyze('fire cow dead').trim();
    var expectedResults = [':fire:', ':fireworks:', ':fire_engine:', ':name_badge:', ':sparkle:', ':ox:', ':water_buffalo:', ':cow2:', ':cow:', ':skull:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);    
  });
  
  it('returns an expected emoji of a commit message with punctuation analysis', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.analyze('dead.').trim();
    var expectedResults = [':skull:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);    
  });
  
  it('returns an expected emoji of a commit message with crazy capitalization analysis', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.analyze('DeAd').trim();
    var expectedResults = [':skull:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);    
  });

  it('returns an emoji for random get', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.random();
    expect(result).toMatch(/:.*: /);
  });
});
