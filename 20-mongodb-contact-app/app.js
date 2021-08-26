/* === Membuat contact app dengan database mongoDB ===  */

const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 3000

/* -- Koneksi ke database --  */
require('./utils/db') // => cuma butuh koneksi
const Contact = require('./models/contact')

/* -- Flash message -- */
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

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

// -- route halaman contact --
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

// -- route halaman detail --
app.get("/contact/:nama", async (req, res) => {
	const contact = await Contact.findOne({nama:req.params.nama});
	res.render("detail", {
		layout: "templates/main-layouts",
		title: "Halaman Kontak",
		url: req.path,
		contact,
	});
});

app.listen(port, () => {
	console.log(`Mongodb contact app | listening port ${port}... `)
})
