var emojis = require('emojilib');
function bySearch(query) {
    var options = [];
    for (var key in emojis) {
        if (emojis.hasOwnProperty(key)) {
            if (emojis[key].keywords && emojis[key].keywords.indexOf(query) > -1) {
                options.push(key);
            }
            else if (key.indexOf(query) > -1) {
                options.push(key);
            }
        }
    }
    if (options.length > 0) {
        return ':' + options[Math.floor(Math.random() * options.length)] + ': ';
    }
    else {
        return null;
    }
}
exports.bySearch = bySearch;
function byCommitType(commitType) {
    var type = commitType;
    if (type === 'bug' || type === 'b') {
        return ':bug: ';
    }
    else if (type === 'formatting' || type === 'f') {
        return ':art: ';
    }
    else if (type === 'documentation' || type === 'docs' || type === 'd') {
        return ':memo: ';
    }
    else if (type === 'performance' || type === 'perf' || type === 'p') {
        return ':racehorse: ';
    }
    else if (type === 'linux' || type === 'l') {
        return ':penguin: ';
    }
    else if (type === 'mac' || type === 'm') {
        return ':apple: ';
    }
    else if (type === 'windows' || type === 'w') {
        return ':checkered_flag: ';
    }
    else if (type === 'removal' || type === 'remove' || type === 'r') {
        return ':fire: ';
    }
    else if (type === 'tests' || type === 'test' || type === 't') {
        return ':white_check_mark: ';
    }
    else if (type === 'security' || type === 's') {
        return ':lock: ';
    }
    else if (type === 'leak' || type === 'mem') {
        return ':non-potable_water: ';
    }
    else if (type === 'ci') {
        return ':green_heart: ';
    }
    else if (type === 'upgrade dep' || type === 'ud') {
        return ':arrow_up: ';
    }
    else if (type === 'downgrade dep' || type === 'dd') {
        return ':arrow_down: ';
    }
    else if (type === 'lint' || type === 'linter') {
        return ':shirt: ';
    }
    else {
        return null;
    }
}
exports.byCommitType = byCommitType;
function random() {
    var result;
    var count = 0;
    for (var prop in emojis) {
        if (Math.random() < 1 / ++count) {
            result = prop;
        }
    }
    return ':' + result + ': ';
}
exports.random = random;
function analyze(message) {
    var words = message.split(' ');
    var options = [];
    var blacklist = ['a', 'an', 'the', 'on', 'in', 'some', 'that', 'you', 'those', 'its', 'thats', 'now', 'is', 'and'];
    for (var i = 0; i < words.length; i++) {
        var query = words[i].toLowerCase().replace(/[^\w]/gi, '');
        if (blacklist.indexOf(query) > -1) {
            continue;
        }
        else {
            var option = bySearch(query);
            if (option) {
                options.push(option);
            }
        }
    }
    if (options.length > 0) {
        return options[Math.floor(Math.random() * options.length)];
    }
    else {
        return null;
    }
}
exports.analyze = analyze;
function replaceWithEmojis(message) {
    var words = message.split(' ');
    for (var i = 0; i < words.length; i++) {
        var query = words[i].toLowerCase().replace(/[^\w]/gi, '');
        for (var key in emojis) {
            if (emojis.hasOwnProperty(key)) {
                if (key === query) {
                    words[i] = words[i].toLowerCase().replace(key, ':' + query + ':');
                    break;
                }
            }
        }
    }
    return words.join(' ');
}
exports.replaceWithEmojis = replaceWithEmojis;
//# sourceMappingURL=get_emoji.js.map