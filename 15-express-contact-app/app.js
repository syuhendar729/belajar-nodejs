/* === Membuat Website Contact App === */

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const { loadContact, findContact } = require('./utils/contacts')
const port = 3000


app.set('view engine', 'ejs')
/* ---- Middleware ----  */
app.use(expressLayouts);
app.use(express.static('public'))


/* ---- Routing ---  */
app.get('/', (req, res) => {
	res.render('index', {
		layout: 'templates/main-layouts',
		title: 'Halaman Index',
		nama: 'Syuhendar',
		desc: 'Web ini dibuat dengan Express yang berjalan di Nodejs'
	})
})


app.get('/about', (req, res) => {
	res.render('about', {
		layout: 'templates/main-layouts',
		title: 'Halaman About',
		desc: 'Ini adalah halaman About | About me'
	})
})


app.get('/contact', (req, res) => {
	const contacts = loadContact()
	res.render('contact', {
		layout: 'templates/main-layouts',
		title: 'Halaman Kontak',
		contacts,
	})
})


app.get('/contact/:nama', (req, res) => {
	const contact = findContact(req.params.nama)
	res.render('detail', {
		layout: 'templates/main-layouts',
		title: 'Halaman Kontak',
		contact,
	})
})

app.use('/', (req, res) => {
	res.status(404)
	console.dir(req.ip)
	res.send('<h1>Halaman Error 404</h1>')
})

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})
