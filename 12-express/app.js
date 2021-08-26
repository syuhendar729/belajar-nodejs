/* === Express js ===
 *
 * => Fast, Unopinionated, minimalist web framework for Nodejs
 * Pengertian sederhana:
 * - Web app fw diatas nodejs
 * - Menyediakan interface minimal, dr kakas yg diperlukan utk web
 * - Membantu pengelolaan data dr server ke aplikasi
 * - MERN, MEVN, MEAN
 * - Founder: Holowaichuck 22 mei 2010
 * 
 * Fitur umum:
 * - Menangani request berbagai metode http dgn mudah (routes)
 * - MVC
 * - Terintegrasi dgn 'view' rendering engine, utk mengelola template
 * - Middleware
 *
 *
 * unopinionated :
 * - tdk ada aturan baku
 * - flexibel
 * - menentukan sendiri struktur aplikasi
 * - bongkar pasang middleware
 *
 * Template Engine:
 * - seperti ejs
 *
 * Database:
 * - Mysql, Mongodb, Postgresql, Oracle, dll
 * 
 * */

const express = require('express')
const app = express()
const port = 3000

/* --- Ketika ada request `get` gunakan app.get(route, callback()) ---  */
app.get('/', (req, res) => {
	// res.send('Hello World!')
	// -- mengembalikan json --
	// res.json({
	//     nama: 'Syuhada',
	//     kelas: 12,
	//     notelp: 081392789
	// })
	// -- mengembalikan file --
	res.sendFile('./pages/index.html', {root: __dirname}) 
})

app.get('/index', (req, res) => {
	res.sendFile('./pages/index.html', {root: __dirname}) 
})

app.get('/about', (req, res) => {
	res.sendFile('./pages/about.html', {root: __dirname}) 
})

app.get('/contact', (req, res) => {
	res.sendFile('./pages/contact.html', {root: __dirname}) 
})

app.get('/product/:id/', (req, res) => {
	// /product/10?category=makanan
	res.send(`Product id : ${req.params.id}<br>Category : ${req.query.category}`)
})


/* --- Ketika tidak ada yg dijalankan gunakan app.use() */
app.use('/', (req, res) => {
	res.status(404)
	console.dir(req.ip)
	res.send('Halaman Error 404')
})

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})
