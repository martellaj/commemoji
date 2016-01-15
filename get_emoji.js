module.exports = function (program) {
  var emojis = require('emojilib');

  /**
   * @name search
   * @desc Returns a result of keyword and code name search.
   * @param query The query to search the emoji list for.
   * @returns A random emoji to append.
   */
  function bySearch (query) {
    var options = [];

    // Search over all emojis, looking for a matching keyword.
    for (var key in emojis) {
      if (emojis.hasOwnProperty(key)) {
        // If the keyword matches, add the emoji to an array of options.
        if (emojis[key].keywords && emojis[key].keywords.indexOf(query) > -1) {
          options.push(key);
        } else if (key.indexOf(query) > -1) {
          options.push(key);
        }
      }
    }

    // If any options have been found, return a random option.
    if (options.length > 0) {
      return ' :' + options[Math.floor(Math.random() * options.length)] + ': ';
      // If there are no options, just get a random emoji from the library.
    } else {
      var result;
      var count = 0;

      for (var prop in emojis) {
        if (Math.random() < 1 / ++count) {
          result = prop;
        }
      }

      return ':' + result + ': ';
    }
  }
  
  /**
   * @name byCommitType
   * @desc Returns the emoji for the given commit type.
   * @param commitType The commit type.
   * @returns The emoji corresponding to the commit type.
   */
  function byCommitType (commitType) {
    var type = program.args[1];

    if (type === 'bug' || type === 'b') {
      return ':bug: ';
    } else if (type === 'formatting' || type === 'f') {
      return ':art: ';
    } else if (type === 'documentation' || type === 'docs' || type === 'd') {
      return ':memo: ';
    } else if (type === 'performance' || type === 'perf' || type === 'p') {
      return ':racehorse: ';
    } else if (type === 'linux' || type === 'l') {
      return ':penguin: ';
    } else if (type === 'mac' || type === 'm') {
      return ':apple: ';
    } else if (type === 'windows' || type === 'w') {
      return ':checkered_flag: ';
    } else if (type === 'removal' || type === 'remove' || type === 'r') {
      return ':fire: ';
    } else if (type === 'tests' || type === 'test' || type === 't') {
      return ':white_check_mark: ';
    } else if (type === 'security' || type === 's') {
      return ':lock: ';
    } else if (type === 'leak' || type === 'mem') {
      return ':non-potable_water: ';
    } else if (type === 'ci') {
      return ':green_heart: ';
    } else if (type === 'upgrade dep' || type === 'ud') {
      return ':arrow_up: ';
    } else if (type === 'downgrade dep' || type === 'dd') {
      return ':arrow_down: ';
    } else if (type === 'lint' || type === 'linter') {
      return ':shirt: ';
    } else {
      return {
        error: 'That isn\'t a known commit type. For a list of supported commit types, run "commemoji -h".'
      };
    }
  }
  
  /**
   * @name
   * @desc Returns a random emoji.
   * @returns A random emoji.
   */
  function random () {
    var result;
    var count = 0;

    for (var prop in emojis) {
      if (Math.random() < 1 / ++count) {
        result = prop;
      }
    }

    return ':' + result + ': ';
  }

  return {
    bySearch: bySearch,
    byCommitType: byCommitType,
    random: random
  };
};
