var exec = require('child_process').exec;
var program = require('commander');

program
  .version('1.0.0')
  .option('-a', 'Stage all untracked files.')
  .option('-m', 'Your Git commit message, un-emojified.')
  .parse(process.argv);
  
console.log(program);
  
if (program.A) {
  exec('git add --all .', function (error, stdout, stderr) {
    console.log(stdout);
  });
}  
  
if (program.M) {
  exec('git commit -m "' + program.args[0] + '"', function (error, stdout, stderr) {
    console.log(stdout);
  });
}
