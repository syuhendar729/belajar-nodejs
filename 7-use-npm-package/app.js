// === Use npm packages ===
// == `validator` and `chalk`  

// -- validator --
const validator = require('validator')
/* console.log(validator.isEmail('foo@bar.com')) //=> true
 * console.log(validator.isMobilePhone('081329306262', 'id-ID'))
 * console.log(validator.isMobilePhone('071232132323', 'id-ID'))
 * console.log(validator.isNumeric('071232132323', 'id-ID')) */

// -- chalk --
const chalk = require('chalk')
console.log(chalk.red('Hello world'))
console.log(chalk.bgBlue.green('Hello world'))
console.log(chalk.italic.bgBlue.red('Hello world'))
const nama = 'Syuhendar'
const pesan = chalk`lorem ipsum dolor {bgYellow.red sit amet consectetur adipiscing} elit sed do eiusmod tempor incididunt ut labore et. Nama : {bgGreen ${nama}}`
console.log(pesan)
console.log(chalk.bgHex('#d4be98').hex('#d8a657')('Hello, world!'))
console.log(chalk.hex('#d3869b').underline('Hello, world!'))
console.log(chalk.keyword('orange')('Some orange text'))
