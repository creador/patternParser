<a href="https://codeship.com/projects/119982" target="_blank">
  <img src="https://img.shields.io/codeship/ff47ba10-7c98-0133-b9e7-2e6bcf2dba9a/master.svg?style=flat-square"
       alt="Build Status" />
</a>
<a href="http://issuestats.com/github/creador/extract-string" target="_blank">
  <img src="http://issuestats.com/github/creador/extract-string/badge/pr?style=flat-square"
       alt="Pull Requests stats" />
</a>
<a href="https://npmjs.org/package/extract-string" target="_blank">
  <img src="https://img.shields.io/npm/dm/extract-string.svg?style=flat-square"
       alt="NPM Downloads" />
</a>
<a href="https://npmjs.org/package/extract-string" target="_blank">
  <img src="https://img.shields.io/npm/v/extract-string.svg?style=flat-square"
       alt="NPM Version" />
</a>

# Extract-String

Extracts the given pattern variables from the given string. 
You can use it to extract url params and strings without using regex. 

## Installation

```shell
npm install extract-string --save
```

Then, in your app:

```js
var extract = require('extract-string');
```

#### Example 1

```js
var test = extract('Hello my friends of the world.\nHello my dear friends of this world.')
			.pattern('{hi} my {type} of {where}.');

/*
returns:
[{
	hi : 'Hello',
	type : 'friends',
	where : 'the world'
},
{
	hi : 'Hello',
	type : 'dear friends',
	where : 'this world'
}
]
*/
```

#### Example 2

```js
var test = extract('/users/12345/friends/6789/picture')
			.pattern('/users/{userid}/friends/{friendid}/picture');
/*
returns:
[{
	userid : 12345,
	friendid : 6789
}]
*/
```

## License

<a href="http://creador.mit-license.org" target="_blank">MIT</a>

