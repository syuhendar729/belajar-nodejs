/* == Node modules ==
 * 
 * Modules => sekumpulan code yg dpt digunakan kembali dgn antarmuka yg terdefinisi
 *
 * -- Node modules -- 
 * => fungsionalitas yg simple atau komplex, tersimpan di file javascript, dan dpt digunakan kembali di aplikasi nodejs
 * => setiap modul di dlm nodejs memiliki kontex-nya masing2, tdk dpt tercampur dgn modul lain dlm lingkup global
 * => kudu di-export dan require
 *
 * -- jenis: --
 * - Core modules
 * - Local modules
 * - Third party modules / npm modules
 *
 * -- require() --
 * urutannya dlm pemanggilan:
 * 1. Core modules 			=> module dari global-nya sono
 * 2. Local modules 		=> file atau direktori `(./ atau ../)`
 * 3. Third party modules 	=> folder name `node_modules`
 *
 * 
 * */

// const fs 		= require('fs') // core module
// const cetakNama = require('./coba') // local module
// const moment	= require('moment') // third party module / npm module

const coba	= require('./coba')

const Orang1 = new coba.Orang()

console.log(coba.cetakNama('Syuhendar'))
console.log(coba.pi)
console.log(coba.org.cetakOrg())
console.log(Orang1)

























