#! /usr/bin/env node

var program = require('commander');
var exec = require('child_process').exec;
var chalk = require('chalk');
var emojis = require("emojilib")

program
  .version('1.0.0')
  .option('-m', 'Your plain, old commit message.')
  .option('-s', 'A seach query to get a relevant emoji.')
  .option('-k', 'A keyword pertaining to common commit types.');

// List commit types underneath help.
program.on('--help', function () {
  console.log('  Common commit types:');
  console.log('');
  console.log('  * "bug" | "b" - When fixing a bug.');
  console.log('  * "formatting" | "f" - When improving the format/structure of the code.'); 
  console.log('  * "docs" | "d" - When writing docs.');
  console.log('  * "perf" | "p" - When improving performance.');
  console.log('  * "linux" | "l" - When fixing something on Linux.');
  console.log('  * "mac" | "m" - When fixing something on Mac OS.');
  console.log('  * "windows" | "w" - When fixing something on Windows.');
  console.log('  * "removal" | "r" - When removing code or files.');
  console.log('  * "ci" - When fixing the CI build.');
  console.log('  * "tests" | "t" - When adding tests.');
  console.log('  * "security" | "s" - When dealing with security.');    
  console.log('  * "upgrade dep" | "ud" - When upgrading dependencies.');
  console.log('  * "downgrade dep" | "dd" - When downgrading dependencies.'); 
  console.log('  * "lint" - When removing/adding linter warnings.');         
});

// Only way to get name to show up in help AFAIK.
process.argv[1] = 'commemoji';

program.parse(process.argv);

if (program.M) {
  var emoji = getEmoji();
  
  if (emoji.error) {
    console.log(chalk.red(emoji.error));
  } else {
    exec('git commit -m "' + emoji + program.args[0] + '"', function (error, stdout, stderr) {
      console.log(stdout);
    }); 
  }
} else {
  console.log(chalk.red('You have to specify a commit message using the -m flag.'));
}

/**
 * @name getEmoji
 * @desc Gets an emoji to add to the commit message.
 */
function getEmoji() {
  if (program.S && program.K) {
    return {
      error: 'You can\'t search and use a common commit type at the same time.'
    };
  } else {
    // If a search term is supplied, try to find one that is relevant.
    if (program.S) {
      var options = [];

      // Search over all emojis, looking for a matching keyword.
      for (var key in emojis) {
        if (emojis.hasOwnProperty(key)) {
          // If the keyword matches, add the emoji to an array of options.
          if (emojis[key].keywords && emojis[key].keywords.indexOf(program.args[1]) > -1) {
            options.push(key);
          } else if (key.indexOf(program.args[1]) > -1) {
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
    } else if (program.K) {
      var type = program.args[1];
      
      if (type === 'bug' || type === 'b') {
        return ':bug: ';
      } else if (type === 'formatting' || type === 'f') {
        return ':art: ';
      } else if (type === 'documentation' || type === 'docs' || type ==='d') {
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
        } 
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
}
