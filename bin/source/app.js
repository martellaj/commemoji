#! /usr/bin/env node
var program = require('commander');
var childProcess = require('child_process');
var chalk = require('chalk');
var getEmoji = require('./get_emoji');
program
    .version('1.1.6')
    .option('-m', 'Your plain, old commit message.')
    .option('-s', 'A seach query to get a relevant emoji.')
    .option('-k', 'A keyword pertaining to common commit types.');
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
process.argv[1] = 'commemoji';
program.parse(process.argv);
var emoji;
if (program.args[0] === '' || program.args[0] === undefined || program.args[0] === null) {
    console.log(chalk.red('You have to specify a commit message.'));
    process.exit();
}
if (program.opts().S && program.opts().K) {
    console.log(chalk.red("You can't search and use a common commit type at the same time."));
    process.exit();
}
else if (program.opts().S) {
    emoji = getEmoji.bySearch(program.args[1]);
}
else if (program.opts().K) {
    emoji = getEmoji.byCommitType(program.args[1]);
    if (emoji === null) {
        console.log(chalk.red('That isn\'t a known commit type. For a list of supported commit types, run "commemoji -h".'));
        process.exit();
    }
}
else {
    emoji = getEmoji.analyze(program.args[0]);
}
if (emoji === null) {
    emoji = getEmoji.random();
}
childProcess.exec('git commit -m "' + emoji + program.args[0] + '"', function (error, stdout, stderr) {
    if (error) {
        if (error) {
            console.log(chalk.red('Something went wrong! Make sure you have at least one file staged and try again.'));
        }
        else {
            console.log(chalk.red('Woah! You hit an error I haven\'t seen yet. Please send the following details to martellaj@live.com. Thank you!'));
            console.error(error);
        }
    }
    else {
        console.log(stdout);
    }
});
//# sourceMappingURL=app.js.map