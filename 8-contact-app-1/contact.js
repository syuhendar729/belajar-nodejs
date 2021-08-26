const fs = require('fs')
const readline = require('readline');
const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout

});

// -- buat folder data jika blm ada --
const folderData = './data'
if (!fs.existsSync(folderData)) {
	fs.mkdirSync(folderData)
}
// -- buat contact.json jika blm ada --
const fileKontak = './data/contacts.json'
if (!fs.existsSync(fileKontak)) {
	fs.writeFileSync(fileKontak, '[]', 'utf8')
}

// -- buat pertanyaan dgn function terpisah dan mengembalikan promis --
const pertanyaan = (ask) => {
	return new Promise( (resolve, reject) => {
		rl.question(ask, (jawaban) => {
			resolve(jawaban)
		})
	})
}

const simpanContact = (nama, email, notelp) => {
	const contact 	= { nama, email, notelp }
	const file	 	= fs.readFileSync('data/contacts.json', 'utf8')
	const contacts 	= JSON.parse(file)
	contacts.push(contact)
	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
	console.log('Data kontak berhasil disimpan : \n', contacts)
	rl.close();
}


module.exports = {pertanyaan, simpanContact}
