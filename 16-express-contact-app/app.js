/* === Membuat Website Contact App === */

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const { loadContact, findContact, addContact, cekDuplikat } = require("./utils/contacts");
const session = require('express-session')
const cookieParser= require('cookie-parser')
const flash = require('connect-flash')
const port = 3000;

app.set("view engine", "ejs");
/* ---- Middleware ----  */
app.use(expressLayouts);
// -- built in middelware --
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// -- config flash message --
app.use(cookieParser())
app.use(session({
	cookie: {maxAge: 6000},
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
}))
app.use(flash())

/* ---- Routing ---  */
app.get("/", (req, res) => {
	res.render("index", {
		layout: "templates/main-layouts",
		title: "Halaman Index",
		nama: "Syuhendar",
		desc: "Web ini dibuat dengan Express yang berjalan di Nodejs",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		layout: "templates/main-layouts",
		title: "Halaman About",
		desc: "Ini adalah halaman About | About me",
	});
});

app.get("/contact", (req, res) => {
	const contacts = loadContact();
	res.render("contact", {
		layout: "templates/main-layouts",
		title: "Halaman Kontak",
		contacts,
		msg: req.flash('msg'),
	});
});

// -- halaman form tambah data --
app.get("/contact/add", (req, res) => {
	res.render("add", {
		layout: "templates/main-layouts",
		title: "Form Tambah Data Kontak",
	});
});

// -- proses data add contact --
app.post(
	"/contact",
	[
		body("nama").custom((value) => {
			const duplikat = cekDuplikat(value);
			if (duplikat) {
				throw new Error("Nama kontak sudah digunakan!");
			}
			return true
		}),
		body("email").isEmail().withMessage("Email ini tidak valid"),
		body("notelp")
			.isMobilePhone("id-ID")
			.withMessage("Nomor HP tidak valid"),
	],
	(req, res) => {
		// console.log(req.body)
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// return res.status(400).json({ errors: errors.array() });
			res.render('add', {
				layout: 'templates/main-layouts',
				title: 'Form Tambah Data Kontak',
				errors: errors.array()
			})
		} else {
			addContact(req.body)
			// -- kirim flash msg --
			req.flash('msg', 'Data contact berhasil ditambahkan!')
			res.redirect('/contact')
		}
	}
);

app.get("/contact/:nama", (req, res) => {
	const contact = findContact(req.params.nama);
	res.render("detail", {
		layout: "templates/main-layouts",
		title: "Halaman Kontak",
		contact,
	});
});

app.use("/", (req, res) => {
	res.status(404);
	console.dir(req.ip);
	res.send("<h1>Halaman Error 404</h1>");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
