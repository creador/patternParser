parser = require('./pattern');

var test = parser('Hello my friends of the world.').pattern('{hi} my {type} of the {where}.');
console.log('result:',test);