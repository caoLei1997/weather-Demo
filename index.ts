const { program } = require('commander');
import colors from 'colors'
program
  .version('0.1.0')
  .option('-c, --city [name]', 'Add city name')
program.parse(process.argv);

if (process.argv.slice(2).length === 0) {
  program.outputHelp(colors.red);
  process.exit();
}
