const strTo = (word) => {
	// -- jadikan semuanya huruf kecil
	const huruf = [...word.toLowerCase()]
	let hasil	= ''
	// -- looping utk menelusuri huruf yg sama
	for(const [i, h] of huruf.entries()){
			for(let ind = 0; ind <= huruf.length; ind++){
			if (h === huruf[ind] && i != ind){
				hasil += '1 '
			} 
		} 
	}
	huruf.forEach((h, i) => {
		for(let ind = 0; ind <= i; ind++){
			if (h !== huruf[ind]) {}
		}
	})
	console.log(hasil)
}

// console.log(strTo('coba'))
strTo('CaC')
console.log('1 0 1')
// console.log('1 0 0 1 1 1')
