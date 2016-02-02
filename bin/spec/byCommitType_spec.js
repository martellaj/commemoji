var getEmoji = require('../source/get_emoji');
describe('tests the byCommitType function', function () {
    it('returns the expected emoji for "bug" commit type', function () {
        var result = getEmoji.byCommitType('bug');
        expect(result).toBe(':bug: ');
    });
    it('returns the expected emoji for an unknown commit type', function () {
        var result = getEmoji.byCommitType('mumbo');
        expect(result).toBe(null);
    });
});
//# sourceMappingURL=byCommitType_spec.js.map