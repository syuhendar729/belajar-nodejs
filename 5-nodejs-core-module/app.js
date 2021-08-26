// ==== Mencoba Core Modules ====
// => filesystem(rs) dan readline(rl)

// == filesystem(fs) ==
const fs = require('fs')
// fs.writeFileSync(file, data[, options])
// => akan membuat file jika blm ada
// => menimpa file yg ada
// => tdk bisa membuat folder jika blm ada

// --- menulis file ---
// -- secara synchronous --
// fs.writeFileSync('hello.txt', 'Hello world dengan synchronous')
// try {
//     fs.writeFileSync('folder/coba.txt', 'Hello world dengan synchronous')
// } catch(e) {
//     console.log(e)
// }
// fs.mkdirSync('data')
// -- secara asynchronous --
// fs.writeFile('data/kontak.json', '[]', (err) => {
//     if(err) throw err
//     console.log('File berhasil disimpan')
// })

// --- membaca file ---
// -- secara synchronous --
// const hello = fs.readFileSync('hello.txt', 'utf8')
// console.log(hello)
// -- secara asynchronous --
// fs.readFile('data/kontak.json', 'utf8', (err, data) => {
//       if (err) throw err;
//       console.log(data);
// });


// == readline ==
const readline = require('readline');
const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout

});
// -- buat aplikasi sederhana, penyimpan kontak --
rl.question('Masukkan nama : ', (nama) => {
	rl.question('Masukkan nomor : ', (nomor) => {
		// console.log(`Nama anda : ${nama}\nNomor anda : ${nomor}`);
		const contact 	= { nama, nomor }	
		const file	 	= fs.readFileSync('data/contacts.json', 'utf8')
		const contacts 	= JSON.parse(file)
		contacts.push(contact)
		// console.log(contacts)
		fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
		console.log('Data kontak berhasil disimpan : \n', contacts)
		rl.close();
	})
});

