// -- memanggil file js lain --
// require('./coba.js') // => hanya menjalankan coba.js, tidak memanggil
// cara memanggil nya, masukkan ke variable
const cobaTampilkan = require('./coba.js')

const nama = 'Syuhendar'
console.log(cobaTampilkan(nama))
