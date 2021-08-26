/* === Middleware ===
 * */

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const port = 3000


app.set('view engine', 'ejs')

/* -- Third party middleware -- */
app.use(expressLayouts);
app.use(morgan('dev')) // => middleware untuk menampilkan log http request di console

/* -- Aplications level middleware -- */
/* Contoh penggunaan middleware */
// app.use( (req, res, next) => {
//     console.log(`Time : `, Date.now())
//     // jika tdk ada next() akan hang tdk lanjut menljalankan fungsi berikutnya
//     next()
// } )

/* -- Built-in middleware -- */
// -- express.static('folder-yg-ingin-dibaca')
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
	/* Jika menggunakan next() disini akan lanjut meng-eksekusi function berikutnya yaitu app.use() */
	// next()
})

/* -- Jika masuk halaman about ini tdk akan di-eksekusi --  */
app.use( (req, res, next) => {
	console.log('Ini middleware ke-2')
	next()
} )

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
		layout: 'templates/main-layouts',
		title: 'Halaman Kontak',
		desc: 'Ini adalah halaman Kontak',
		orang
	})
})


app.use((req, res) => {
	res.status(404)
	console.dir(req.ip)
	res.send('<h1>Halaman Error 404</h1>')
})

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
})
