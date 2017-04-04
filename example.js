extract = require('./pattern');

// example 1
var test = extract('Hello my friends of the world.')
			.pattern('{hi} my {type} of the {where}.');

/*
returns:
{
	hi : 'Hello',
	type : 'friends',
	where : 'world'
}
*/
console.log('result:',test);

// example 2
var test = extract('<a>Hola amigos</a><u>este texto esta subrayado.</u>')
			.pattern('<a>{saludo}</a><u>{underscore}</u>');

/*
returns:
{
	saludo : 'Hola amigos',
	underscore : 'este texto esta subrayado.'
}
*/
console.log('result:',test);

// example 3
var test = extract('/users/12345/friends/6789/picture')
			.pattern('/users/{userid}/friends/{friendid}/picture');
/*
returns:
{
	userid : 12345,
	friendid : 6789
}
*/
console.log('result:',test);