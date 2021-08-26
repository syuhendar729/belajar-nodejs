/* === Model contacts untuk query ke mongodb ===  */
/*
 * Model => sesuai namanya model data-nya mau bagaimana untuk collections contacts 
 * misal: nama harus string, notelp number, dll
 * 
 * */

const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", {
	nama: {
		type: String,
		required: true,
	},
	notelp: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
});

/* -- Diperlukan di app.js  */
module.exports = Contact;
