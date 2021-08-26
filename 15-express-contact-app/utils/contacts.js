const fs = require('fs')

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

// -- baca file contacts.json dan ambil semua datanya --
const loadContact = () => {
	const file	 	= fs.readFileSync('data/contacts.json', 'utf8')
	const contacts 	= JSON.parse(file)
	return contacts
}


// -- temukan contact berdasarkan nama --
const findContact = (nama) => {
	const contacts	= loadContact()
	const contact 	= contacts.find(con => con.nama.toLowerCase() === nama.toLowerCase())
	return contact

}

module.exports = { loadContact, findContact }
