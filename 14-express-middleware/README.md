/* === Middleware ===
 * 
 * => Sebuah sowftware yg menghubungkan software atau aplikasi lain
 * => Sebuah software penghubung antara sistem operasi dan aplikasi
 * => Sekarang bisa digunakan di :
 * - database
 * - web server
 * - game engine
 * - web apps, mobile apps, desktop, apps
 * 
 * --- Pada Web Apps ---
 * request => App => respond
 * request => middleware - App - middleware => respond
 * middleware bisa berupa:
 * - routing
 * - authentication
 *
 * --- Express Middleware ---
 * => Aplikasi express berisi pemanggilan funsi middleware
 *
 * --- Function middleware ---
 * => Sebuah fungsi yg memiliki akse ke object request req(), respond res(), dan fungsi middleware berikutnya next()
 * => Dapat melakukan:
 * 	- Eksekusi berbagai code
 * 	- Membuat perubahan pd request dan respond object
 * 	- Mengakhiri siklus request-respond
 * 	- Memanggil function middleware berikutnya dgn next()
 * 
 * --- Macam2 Middleware ---
 * => User defined middleware
 * 	- Aplication-level middleware
 * 	- Router-level middleware
 * 	- Error-handling middleware
 * => Built in middleware
 * => Third party middleware
 *
 * Note:
 * Bbrp function tanpa next() bisa `hang`
 * Penyimpanan code middleware harus sesuai dgn urutan nya
 * next() buat ke middleware (function) berikutnya
 *
 * */
