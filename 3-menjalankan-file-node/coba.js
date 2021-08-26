function cobaTampilkan(nama){
	return `Halo nama saya ${nama}`
}

console.log('Hello world')

// -- meng-export file ini agar function-nya bisa digunakan di file lain
module.exports = cobaTampilkan
