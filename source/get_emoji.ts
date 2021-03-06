var emojis = require('emojilib');

/**
 * @name search
 * @desc Returns a result of keyword and code name search.
 * @param query The query to search the emoji list for.
 * @returns A random emoji to append.
 */
export function bySearch (query: string): string {
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
    return ':' + options[Math.floor(Math.random() * options.length)] + ': ';
  } else {
    return null;
  }
}

/**
 * @name byCommitType
 * @desc Returns the emoji for the given commit type.
 * @param commitType The commit type.
 * @returns The emoji corresponding to the commit type.
 */
export function byCommitType (commitType: string): string {
  var type = commitType;

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
    return null;
  }
}

/**
 * @name
 * @desc Returns a random emoji.
 * @returns A random emoji.
 */
export function random (): string {
  var result;
  var count = 0;

  for (var prop in emojis) {
    if (Math.random() < 1 / ++count) {
      result = prop;
    }
  }

  return ':' + result + ': ';
}

/**
 * @analyze
 * @desc Returns an emoji based on theh commit message.
 * @param message The commit message.
 * @returns An emoji based on the commit message.
 */
export function analyze (message: string): string {
  var words = message.split(' ');
  var options = [];
    
  // These words aren't descriptive and shouldn't be counted in analysis.
  // Definitely not a complete list, always can add more.
  var blacklist = ['a', 'an', 'the', 'on', 'in', 'some', 'that', 'you', 'those', 'its', 'thats', 'now', 'is', 'and'];

  for (var i = 0; i < words.length; i++) {
    var query = words[i].toLowerCase().replace(/[^\w]/gi, '');

    if (blacklist.indexOf(query) > -1) {
      continue;
    } else {
      var option = bySearch(query);

      if (option) {
        options.push(option);
      }
    }
  }

  // If any options have been found, return a random option.
  if (options.length > 0) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return null;
  }
}

/**
 * Replaces words in the commit message with emojis, provided they exist as a key.
 * 
 * @name replaceWithEmojis
 * @param message The commit message
 * @returns The commit message with words replaced by emojis
 */
export function replaceWithEmojis (message: string): string {
  var words = message.split(' ');

  for (var i = 0; i < words.length; i++) {
    var query = words[i].toLowerCase().replace(/[^\w]/gi, '');

    // Search over all emojis, looking for a matching keyword.
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
