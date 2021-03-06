#! /usr/bin/env node

import program = require('commander');
import childProcess = require('child_process');
import chalk = require('chalk');
import getEmoji = require('./get_emoji');

program
  .version('1.1.7')
  .option('-s', 'A seach query to get a relevant emoji.')
  .option('-k', 'A keyword pertaining to common commit types.')
  .option('-r', 'Replaces keywords in your commit message with emojis.');

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

// Throw an error and exit if no commit message is supplied.
if (program.args[0] === '' || program.args[0] === undefined || program.args[0] === null) {
  console.log(chalk.red('You have to specify a commit message.'));
  process.exit();
}

// Depending on chosen flags, get an emoji is whichever way the user signified.
if (program.opts().S && program.opts().K) {
  console.log(chalk.red("You can't search and use a common commit type at the same time."));
  process.exit();
// If the "-s" flag is on, search for an emoji.
} else if (program.opts().S) {
  emoji = getEmoji.bySearch(program.args[1]);
// If the "-k" flag is on, get the emoji corresponding to the commit type.
} else if (program.opts().K) {
  emoji = getEmoji.byCommitType(program.args[1]);

  // If user specifies an unknown commit type, exit.
  if (emoji === null) {
    console.log(chalk.red('That isn\'t a known commit type. For a list of supported commit types, run "commemoji -h".'));
    process.exit();
  }
// If no flags were specified, try picking one out that makes sense for the commit message.
} else {
  emoji = getEmoji.analyze(program.args[0]);
}

// If search comes up empty, get a random emoji.
if (emoji === null) {
  emoji = getEmoji.random();
}

// If the "-r" flag is on, replace keywords in the commit message with emojis.
let message = program.args[0];

if (program.opts().R) {
  message = getEmoji.replaceWithEmojis(message);
}

// Append the emoji to the commit message and commit.
childProcess.exec('git commit -m "' + emoji + message + '"', function (error, stdout, stderr) {
  if (error) {
    if (error) {
      console.log(chalk.red('Something went wrong! Make sure you have at least one file staged and try again.'));
    } else {
      console.log(chalk.red('Woah! You hit an error I haven\'t seen yet. Please send the following details to martellaj@live.com. Thank you!'));
      console.error(error);
    }
  } else {
    console.log(stdout);
  }
});
