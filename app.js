#! /usr/bin/env node

var program = require('commander');
var exec = require('child_process').exec;
var chalk = require('chalk');
var emojis = require("emojilib")

program
  .version('1.0.0')
  .option('-m', 'Your plain, old commit message.')
  .option('-k', 'A keyword to get a relevant emoji.')
  .parse(process.argv);

if (program.M) {
  exec('git commit -m "' + getEmoji() + program.args[0] + '"', function (error, stdout, stderr) {
    console.log(stdout);
  });
} else {
  console.log(chalk.red('You have to specify a commit message using the -m flag.'));
}

/**
 * @name getEmoji
 * @desc Gets an emoji to add to the commit message.
 */
function getEmoji() {
  // If a keyword was supplied, try to find one that is relevant.
  if (program.K) {
    var options = [];

    // Search over all emojis, looking for a matching keyword.
    for (var key in emojis) {
      if (emojis.hasOwnProperty(key)) {
        // If the keyword matches, add the emoji to an array of options.
        if (emojis[key].keywords && emojis[key].keywords.indexOf(program.args[1]) > -1) {
          options.push(key);
        }
      }
    }

    // If any options have been found, return a random option.
    if (options.length > 0) {
      return ' :' + options[Math.floor(Math.random() * options.length)] + ':';
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
  // If no keyword is supplied, get a random emoji from the library.
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