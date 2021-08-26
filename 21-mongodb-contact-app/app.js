/* === Membuat contact app dengan database mongoDB ===  */

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3001;

/* -- Koneksi ke database --  */
require("./utils/db"); // => cuma butuh koneksi
const Contact = require("./models/contact");

/* -- Validator -- */
const { body, validationResult, check } = require("express-validator");

/* -- Flash message -- */
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

/* -- Fitur method resuest (put, delete) -- */
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

/* -- config ejs and layouts -- */
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* -- config flash message -- */
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

/* ## Routing ##  */
app.get("/", (req, res) => {
	res.render("index", {
		layout: "templates/main-layouts",
		title: "Halaman Index",
		nama: "Syuhendar",
		desc: "Web ini dibuat dengan Express yang berjalan di Nodejs",
		url: req.path,
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		layout: "templates/main-layouts",
		title: "Halaman About",
		desc: "Ini adalah halaman About | About me",
		url: req.path,
	});
});

/* ### Aplikasi Contact ### */

/* -- route halaman contact -- */
app.get("/contact", async (req, res) => {
	/* Contact.find().then( (contact) => {
		res.send(contact)
	} ) */

	/* -- dengan async await -- */
	const contacts = await Contact.find();
	res.render("contact", {
		layout: "templates/main-layouts",
		title: "Halaman Kontak",
		contacts,
		msg: req.flash("msg"),
		url: req.path,
	});
});

/* -- route halaman form tambah data -- */
app.get("/contact/add", (req, res) => {
	res.render("add", {
		layout: "templates/main-layouts",
		title: "Form Tambah Data Kontak",
		url: req.path,
	});
});

/* -- proses data add contact -- */
app.post(
	"/contact",
	[
		body("nama").custom(async (value) => {
			const duplikat = await Contact.findOne({ nama: value });
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
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.render("add", {
				layout: "templates/main-layouts",
				title: "Form Tambah Data Kontak",
				errors: errors.array(),
				url: req.path,
			});
		} else {
			/* -- Masukkan req.body yg sudah object -- */
			Contact.insertMany(req.body, (error, result) => {
				// -- kirim flash msg --
				req.flash("msg", "Data contact berhasil ditambahkan!");
				res.redirect("/contact");
			});
		}
	}
);

/* -- route delete contact -- */
/* app.get("/contact/delete/:nama", async (req, res) => {
	const contact = await Contact.findOne({ nama: req.params.nama });
	// -- jika contact tidak ada --
	if (!contact) {
		res.status(404);
		res.send("<h1>404</h1>");
	} else {
		Contact.deleteOne({ _id: contact._id }, (result) => {
			req.flash("msg", "Data contact berhasil dihapus!");
			res.redirect("/contact");
		})
	}
}); */

/* -- route delete contact dengan request `delete` -- */
app.delete("/contact", (req, res) => {
	Contact.deleteOne({ nama: req.body.nama }).then((result) => {
		req.flash("msg", "Data contact berhasil dihapus!");
		res.redirect("/contact");
	});
});

/* -- route form edit contact --  */
app.get("/contact/edit/:nama", async (req, res) => {
	const contact = await Contact.findOne({ nama: req.params.nama });
	res.render("edit", {
		layout: "templates/main-layouts",
		title: "Form Tambah Data Kontak",
		url: req.path,
		contact,
	});
});

/* -- route process update(edit) contact with request `put` -- */
app.put(
	"/contact",
	[
		body("nama").custom(async (value, { req }) => {
			const duplikat = await Contact.findOne({ nama: value });
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
			Contact.updateOne(
				{ _id: req.body._id },
				{
					$set: {
						nama: req.body.nama,
						email: req.body.email,
						notelp: req.body.notelp,
					},
				}
			).then((result) => {
				// -- kirim flash msg --
				req.flash("msg", "Data contact berhasil diubah!");
				res.redirect("/contact");
			});
		}
	}
);

/* -- route halaman detail -- */
app.get("/contact/:nama", async (req, res) => {
	const contact = await Contact.findOne({ nama: req.params.nama });
	res.render("detail", {
		layout: "templates/main-layouts",
		title: "Halaman Kontak",
		url: req.path,
		contact,
	});
});

/* -- route default jika halaman tidak ada -- */
app.use("/", (req, res) => {
	res.status(404);
	console.dir(req.ip);
	res.send("<h1>Halaman Error 404</h1>");
});

app.listen(port, () => {
	console.log(`Mongodb contact app | listening port ${port}... `);
});


