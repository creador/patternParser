"use strict";
/* 
usage:
var test = pattern.init('Hello my friends of the world').pattern('{salute} my {type} of the {where}');
test = [
	{
		salute: 'Hello',
		type: 'friends',
		where: 'world'
	}
];
*/
var global = {
	config 	: 	{
		open 	: 	'{',
		close 	: 	'}'
	}
};
//
class patternParser {
	constructor (config, content) {
		if (arguments.length>1) {
			for (let c in config) {
				global.config[c] = config[c];
			}
			global.content = content;
		} else {
			global.content = arguments[0];
		}
	}

	pattern (pattern) {
		// private method
		const escapeRegExp = (str, asterisks) => {
            const regexp = (asterisks) ? /[\-\[\]\/\{\}\(\)\*\<\>\+\?\ \,\.\\\^\$\|]/g : /[\-\[\]\/\{\}\(\)\<\>\+\?\ \,\.\\\^\$\|]/g;
            return str.replace(regexp, '\\$&');
        }

		const findVariables = (text,symbol,symbol_closing) => {
			var vars = '', symbol_t = '', symbol_l = '';
			var symbol_tb = '', symbol_lb = '', partirEn = 0, tmp_name = '';
			var allowed_symbols = 'a-zA-Z0-9\\_\\-\\+\\/\\ \\*\\{\\}\\.\\,\\[\\]\\(\\)\\\'\%\?\"\<\>\\\\';
			for (let qss in symbol) {
				symbol_l  = symbol[qss];
				symbol_t += '[\\' + symbol_l + ']';
				allowed_symbols = allowed_symbols.split('\\'+symbol_l).join('');
			}
			if (symbol_closing!='') {
				for (let qss in symbol_closing) {
					symbol_lb  = symbol_closing[qss];
					symbol_tb += '[\\' + symbol_lb + ']';
					allowed_symbols = allowed_symbols.split('\\'+symbol_lb).join('');
				}
			}
			if (symbol_tb=='') symbol_tb=symbol_t;
			let nadamas = false;
			while(!nadamas) {
				var to_m = symbol_t+'['+allowed_symbols+']*'+symbol_tb;
				var test = new RegExp(to_m,'gim');
				var utiles = text.match(test);
				var resp = [];
				for (let i in utiles) {
					resp.push(utiles[i].split(symbol).join('').split(symbol_closing).join(''));
				}
				nadamas = true;
			}
			return resp;
		}

		// get var tokens
		this.tokens = findVariables(pattern,global.config.open,global.config.close);

		// replace pattern content with catch-alls
		let catchs_e = pattern;
		this.tokens.forEach(token => {
			catchs_e = catchs_e.replace(global.config.open+token+global.config.close, '(.*)');
		});
		let catchs = escapeRegExp(catchs_e,true).split('\\(\\.\\*\\)').join('(.*)');

		// search catch-alls in given content
		var resp = [];
		if (catchs!=pattern) {
			let myregex = new RegExp(catchs,'gim');
			let catches = [], result;
			while ((result = myregex.exec(global.content)) != null) {
				let cnta = 0, line = {};
				if (result.length>=this.tokens.length) {
					result.forEach(rvar => {
						if (cnta!=0) {
							line[this.tokens[cnta-1]] = rvar;
						}
						cnta++;
					});
					resp.push(line);
				}
			}
		}
		return resp;
	}
}

module.exports = function(text) {
	return new patternParser(text);
};