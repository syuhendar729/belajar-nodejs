/* === Membuat Website Contact App === */

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const {
	loadContact,
	findContact,
	addContact,
	cekDuplikat,
	deleteContact,
	updateContacts,
} = require("./utils/contacts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const port = 3001;

app.set("view engine", "ejs");
/* ---- Middleware ----  */
app.use(expressLayouts);
// -- built in middelware --
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// -- config flash message --
app.use(cookieParser());
app.use(
	session({
		cookie: { maxAge: 6000 },
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(flash());

/* ---- Routing ---  */
app.get("/", (req, res) => {
	console.log(req.path)
	res.render("index", {
		layout: "templates/main-layouts",
		title: "Halaman Index",
		nama: "Syuhendar",
		desc: "Web ini dibuat dengan Express yang berjalan di Nodejs",
		url: req.path,
	});
});

app.get("/about", (req, res) => {
	console.log(req.baseUrl)
	res.render("about", {
		layout: "templates/main-layouts",
		title: "Halaman About",
		desc: "Ini adalah halaman About | About me",
		url: req.path,
	});
});

/* ### Aplikasi Contact ### */

// -- route halaman contact --
app.get("/contact", (req, res) => {
	const contacts = loadContact();
	res.render("contact", {
		layout: "templates/main-layouts",
		title: "Halaman Kontak",
		contacts,
		msg: req.flash("msg"),
		url: req.path,
	});
});

// -- route halaman form tambah data --
app.get("/contact/add", (req, res) => {
	res.render("add", {
		layout: "templates/main-layouts",
		title: "Form Tambah Data Kontak",
		url: req.path,
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
			return true;
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
			res.render("add", {
				layout: "templates/main-layouts",
				title: "Form Tambah Data Kontak",
				errors: errors.array(),
				url: req.path,
			});
		} else {
			addContact(req.body);
			// -- kirim flash msg --
			req.flash("msg", "Data contact berhasil ditambahkan!");
			res.redirect("/contact");
		}
	}
);

// -- route delete contact --
app.get("/contact/delete/:nama", (req, res) => {
	const contact = findContact(req.params.nama);
	// -- jika contact tidak ada --
	if (!contact) {
		res.status(404);
		res.send("<h1>404</h1>");
	} else {
		req.flash("msg", "Data contact berhasil dihapus!");
		deleteContact(req.params.nama);
		res.redirect("/contact");
	}
});

// -- route halama edit contact --
app.get("/contact/edit/:nama", (req, res) => {
	const contact = findContact(req.params.nama);
	res.render("edit", {
		layout: "templates/main-layouts",
		title: "Form Tambah Data Kontak",
		url: req.path,
		contact,
	});
});

// -- proses ubah data --
app.post(
	"/contact/update",
	[
		body("nama").custom((value, { req }) => {
			const duplikat = cekDuplikat(value);
			// -- cek nama jika tdk sama dgn nama lama dan duplikat --
			if (value !== req.body.oldnama && duplikat) {
				throw new Error("Nama kontak sudah digunakan!");
			}
			return true;
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
			res.render("edit", {
				layout: "templates/main-layouts",
				title: "Form Tambah Data Kontak",
				errors: errors.array(),
				url: req.path,
				contact: req.body,
			});
		} else {
			updateContacts(req.body);
			// -- kirim flash msg --
			req.flash("msg", "Data contact berhasil diubah!");
			res.redirect("/contact");
		}
	}
);

// -- route halaman detail --
app.get("/contact/:nama", (req, res) => {
	const contact = findContact(req.params.nama);
	res.render("detail", {
		layout: "templates/main-layouts",
		title: "Halaman Kontak",
		url: req.path,
		contact,
	});
});

// -- route default jika halaman tidak ada --
app.use("/", (req, res) => {
	res.status(404);
	console.dir(req.ip);
	res.send("<h1>Halaman Error 404</h1>");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
