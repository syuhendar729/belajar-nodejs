/* === Nodejs web server ===
 *
 * dgn module `http`
 * http.createServer(callback(require, respon))
 * .listen(port, hostname, callback())
 *
 * */

const http = require("http");
const fs = require("fs");
const port = 3002;

const renderHtml = (page, res) => {
	const html = fs.readFileSync(`./pages/${page}.html`, "utf8");
	res.write(html);
};

/* --- Buat server dengan createServer() --- */
const server = http.createServer((req, res) => {
	/* -- ubah type content menjadi html -- */
	res.writeHead(200, {
		"Content-Type": "text/html", // => default plain text
	});

	/* -- buat routing dari request url --  */
	const url = req.url;
	// if (url === "/contact") {
	//     // res.write('Ini halaman contact')
	//     renderHtml("contact", res);
	// } else if (url === "/about") {
	//     // res.write('Ini halaman about')
	//     renderHtml("about", res);
	// } else {
	//     // fs.readfile('./index.html', 'utf8', (err, data) => {
	//     //     if (err) {
	//     //         res.writehead(404)
	//     //         res.end(`error : ${err}`)
	//     //     }
	//     //     res.end(data)
	//     //     console.log(data)
	//     // })
	//     renderHtml("index", res);
	// }
	switch (url) {
		case "/about":
			renderHtml("about", res);
			break;
		case "/contact":
			renderHtml("contact", res);
			break;
		default:
			renderHtml("index", res);
			break;
	}

	/* -- akhiri respond -- */
	res.end();
});

/* -- Jalankan server dgn listen() --  */
server.listen(port, () => {
	console.log(`Server is listening on port ${port} ... `);
});
