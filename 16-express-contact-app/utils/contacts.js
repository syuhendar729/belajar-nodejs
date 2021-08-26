const fs = require("fs");

// -- buat folder data jika blm ada --
const folderData = "./data";
if (!fs.existsSync(folderData)) {
	fs.mkdirSync(folderData);
}
// -- buat contact.json jika blm ada --
const fileKontak = "./data/contacts.json";
if (!fs.existsSync(fileKontak)) {
	fs.writeFileSync(fileKontak, "[]", "utf8");
}

// -- baca file contacts.json dan ambil semua datanya --
const loadContact = () => {
	const file = fs.readFileSync("data/contacts.json", "utf8");
	const contacts = JSON.parse(file);
	return contacts;
};

// -- temukan contact berdasarkan nama --
const findContact = (nama) => {
	const contacts = loadContact();
	const contact = contacts.find(
		(con) => con.nama.toLowerCase() === nama.toLowerCase()
	);
	return contact;
};

// -- menimpa file contacts.json dgn data baru --
const saveContacts = (contacts) => {
	fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
};

// -- menambahkan data contac baru --
const addContact = (contact) => {
	const contacts = loadContact();
	contacts.push(contact);
	saveContacts(contacts);
};

// -- cek nama yg sama --
const cekDuplikat = (nama) => {
	const contacts = loadContact();
	return contacts.find((contact) => contact.nama === nama);
};

module.exports = { loadContact, findContact, addContact, cekDuplikat };
