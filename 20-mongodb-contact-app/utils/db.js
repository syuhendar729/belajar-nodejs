/* === Koneksi ke database mongoDB menggunakan Mongoose === */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodejs', {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
});


/* -- Menambahkan data -- */
/* const contact1 = new Contact({ 
	nama: 'Zild',
	notelp: '0813978242',
	email: 'zild@mail.com'	
});
contact1.save().then((res) => console.log(res)); */




