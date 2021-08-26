// ==== Memembuat Contact App ====

const {pertanyaan, simpanContact} = require('./contact')

// -- buat function utama utk menjalankan function pertanyaan sebelumnya --
// - konsep async await --
const main = async () => {
	const nama 	= await pertanyaan('Masukkan nama : ')
	const email = await pertanyaan('Masukkan email : ')
	const notelp = await pertanyaan('Masukkan nomor : ')
	simpanContact(nama, email, notelp)
}

main()


