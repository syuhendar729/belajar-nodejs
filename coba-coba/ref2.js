function duplicateEncode(str){
	const word = str.toLowerCase();
	let unique = '';
	for (var i = 0; i < word.length; i++) {
		if (word.lastIndexOf(word[i]) === word.indexOf(word[i])) unique += '(';
		else unique += ')';
	}
	return unique;
}
//test by printing this in the console
console.log(duplicateEncode('cobac'))

