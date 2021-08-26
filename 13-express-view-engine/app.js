/* === Express js ===
 *
 * View Engine
 *
 * */

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const port = 3000


/* Gunakan EJS */
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	/* -- Tampilkan halaman index.js dan masukkan data yg ada di dlm {} -- */
	res.render('index', {
		title: 'Halaman Index',
		nama: 'Syuhendar',
		desc: 'Halo semua nama saya syuhada rantisi, tinggal di tangsel '
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'Halaman About',
		desc: 'Ini adalah halaman About'
	})
})

app.get('/contact', (req, res) => {
	const orang = [
		{
			nama: 'Syuhada',
			kelas: 12
		},
		{
			nama: 'Rantisi',
			kelas: 11 
		},
		{
			nama: 'Hendar',
			kelas: 10
		},
	]
	res.render('contact', {
		title: 'Halaman Kontak',
		desc: 'Ini adalah halaman Kontak',
		orang
	})
})

app.use(expressLayouts);
/* Coba Layouts */
app.get('/coba', (req, res) => {
	res.render('coba', {
		title: 'Halaman Coba',
		desc: 'Mencoba metode layouts yang berbeda',
		layout: 'templates/main-layouts'
	})
})


app.use('/', (req, res) => {
	res.status(404)
	console.dir(req.ip)
	res.send('Halaman Error 404')
})

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})
