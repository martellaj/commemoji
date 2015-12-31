var program = require('commander');
var exec = require('child_process').exec;

program
  .version('1.0.0')
  .option('-a', 'Stage all dirty files.')
  .option('-m', 'Your plain, old commit message.')
  .parse(process.argv);

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