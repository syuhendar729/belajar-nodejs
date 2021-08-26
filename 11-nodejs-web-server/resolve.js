/* === Nodejs web server ===
 * 
 *  dgn module `http`
 * http.createServer(callback(require, respon))
 *.listen(port, hostname, callback())
 *
 * */

const http = require("http");
const fs = require("fs");
const port = 3001;


const renderHtml = (page, res) => {
	fs.readFile(`./pages/${page}.html`, 'utf8', (err, data) => {
		if (err) {
			res.writeHead(404)
			res.end(`Error : ${err}`)
		} 
		res.end(data)
		// console.log(data)
	})
} 

/* --- Buat server dengan createServer() ---  */
const server = http.createServer((req, res) => {
	  /* -- ubah type content menjadi html -- */
	res.writeHead(200, {
		"Content-Type": "text/html" // => default plain text
	});

	/* -- buat routing dari request url --  */
	const url = req.url;
	if (url === "/contact") {
		// res.end("Ini halaman contact");
		renderHtml('contact', res)	
		  
	} else if (url === "/about") {
		// res.end("Ini halaman about");
		renderHtml('about', res)
		  
	} else {
		renderHtml('index', res)	  
	}

});

/* -- Jalankan server dgn listen() --  */
server.listen(port, () => {
	console.log(`Server is listening on port ${port} ... `);
});

