var isipright = require('../index');

console.log(isipright.check('127.0.0.2')); //true
console.log(isipright.check(['127.0.0.0', '127.0.0.']));  // false
console.log(isipright.check(['127.0.0.3', '127.0.0.1'])); // true
console.log(isipright.check(['127.0.0.0', '127.0.0.1'])); // false
console.log(isipright.check('127.0.0.0')); //false
console.log(isipright.check(['127.0.0.2', '255.255.255.256']));  //false
