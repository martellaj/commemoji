#! /usr/bin/env node

var program = require('commander');
var exec = require('child_process').exec;
var chalk = require('chalk');
var emoji = require('./emoji')(program);

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
  var emoji;
  if (program.S) {
    emoji = emoji.search(program.args[1]);
  } else {
    emoji = emoji.getEmoji();
  }

  if (emoji.error) {
    console.log(chalk.red(emoji.error));
  } else {
    exec('git commit -m "' + emoji + program.args[0] + '"', function (error, stdout, stderr) {
      if (error) {
        console.error(error);
      } else {
        console.log(stdout);
      }
    });
  }
} else {
  console.log(chalk.red('You have to specify a commit message using the -m flag.'));
}
