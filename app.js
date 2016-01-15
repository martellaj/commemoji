#! /usr/bin/env node

var program = require('commander');
var exec = require('child_process').exec;
var chalk = require('chalk');
var getEmoji = require('./get_emoji')(program);

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

// Parse the arguments supplied to the app.
program.parse(process.argv);

// The emoji to append to the commit message.
var emoji;
  
// Depending on chosen flags, get an emoji is whichever way the user signified.
if (program.S && program.K) {
  console.log(chalk.red('You can\'t search and use a common commit type at the same time.'));
  process.exit();
// If the "-s" flag is on, search for an emoji.
} else if (program.S) {
  emoji = getEmoji.bySearch(program.args[1]);
// If the "-k" flag is on, get the emoji corresponding to the commit type.
} else if (program.K) {
  emoji = getEmoji.byCommitType(program.args[1]);
} else {
  emoji = getEmoji.getEmoji();
}

// Print an error if there is one.
if (emoji.error) {
  console.log(chalk.red(emoji.error));
// If there is no error, "git commit" with the emojified commit message.
} else {
  exec('git commit -m "' + emoji + program.args[0] + '"', function (error, stdout, stderr) {
    if (error) {
      console.error(error);
    } else {
      console.log(stdout);
    }
  });
}
