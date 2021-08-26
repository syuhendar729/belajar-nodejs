const input = ['s','u','r','a','k','a','r','t','a'];
function strTo(word){
	const huruf = [...word.toLowerCase()]

	const duplicates = huruf.reduce((acc, el, i, arr) => {
	if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc += el; return acc;
	});
	console.log(duplicates);
}

strTo('CocAa')
