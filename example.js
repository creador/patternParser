extract = require('./pattern');

var test = extract('Hello my friends of the world.\nHello my dear friends of this world.')
			.pattern('{hi} my {type} of {where}.');

console.log('example 1 result:',test);
/*
returns:
[{
	hi		: 'Hello',
	type	: 'friends',
	where	: 'the world'
},
{
	hi		: 'Hello',
	type 	: 'dear friends',
	where 	: 'this world'
}
]
*/

var test = extract(`
						/users/12345/friends/6789/picture 
						/users/otro/friends/mas/picture
			`)
			.pattern('/users/{userid}/friends/{friendid}/picture');

console.log('example 2 result:',test);