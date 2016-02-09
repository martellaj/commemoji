import getEmoji = require('../source/get_emoji');

describe('tests the replaceWithEmoji function', function () {  
  it('returns a commit message with replaced with emojis', function () {
    var result = getEmoji.replaceWithEmojis('The cow is on fire.').trim();
    var expectedResult = 'The :cow: is :on: :fire:.';
    expect(result).toBe(expectedResult);
  });
  
  it('returns a commit message with all caps replaced with emojis', function () {
    var result = getEmoji.replaceWithEmojis('THE COW IS ON FIRE.').trim();
    var expectedResult = 'THE :cow: IS :on: :fire:.';
    expect(result).toBe(expectedResult);
  });
  
  it('returns a commit message with no keys replaced with emojis', function () {
    var result = getEmoji.replaceWithEmojis('bingo bongo bango').trim();
    var expectedResult = 'bingo bongo bango';
    expect(result).toBe(expectedResult);
  });
  
  it('returns an empty commit message replaced with emojis', function () {
    var result = getEmoji.replaceWithEmojis('').trim();
    var expectedResult = '';
    expect(result).toBe(expectedResult);
  });
});
