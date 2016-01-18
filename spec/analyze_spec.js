/* global describe, expect, it */

describe('tests the analzye function', function () {
  it('returns an expected emoji of a simple commit message', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.analyze('fire cow dead').trim();
    var expectedResults = [':fire:', ':fireworks:', ':fire_engine:', ':name_badge:', ':sparkle:', ':ox:', ':water_buffalo:', ':cow2:', ':cow:', ':skull:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });

  it('returns an expected emoji of a commit message with punctuation', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.analyze('dead.').trim();
    var expectedResults = [':skull:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });

  it('returns an expected emoji of a commit message with crazy capitalization', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.analyze('DeAd').trim();
    var expectedResults = [':skull:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });
  
  it('returns an expected emoji of a commit message with common articles', function () {
    var getEmoji = require('../get_emoji')({});

    var result = getEmoji.analyze('This cow is on fire and now it\'s dead.').trim();
    console.log(result);
    var expectedResults = [':fire:', ':fireworks:', ':fire_engine:', ':name_badge:', ':sparkle:', ':ox:', ':water_buffalo:', ':cow2:', ':cow:', ':skull:'];
    expect(expectedResults.indexOf(result) > -1).toBe(true);
  });
});
