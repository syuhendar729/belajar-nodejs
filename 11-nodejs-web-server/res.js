/* === Nodejs web server ===
 *  *
 *   * dgn module `http`
 *    * http.createServer(callback(require, respon))
 *     * .listen(port, hostname, callback())
 *      *
 *       * */

const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 8080;

/* --- Buat server dengan createServer() ---  */
const server = http.createServer((req, res) => {
	  /* -- ubah type content menjadi html -- */
	res.writeHead(200, {
		    "Content-Type": "text/html" // => default plain text
		  
	});

	  /* -- buat routing dari request url --  */
	  const url = req.url;
	if (url === "/contact") {
		    res.end("Ini halaman contact");
		  
	} else if (url === "/about") {
		    res.end("Ini halaman about");
		  
	} else {
		fs.readFile(path.resolve(__dirname, "index.html"), "utf8", (err, data) => {
			if (err) {
				        res.writeHead(404);
				        res.end(`Error : ${err}`);
				      
			}
			      res.end(data);
			    
		});
		  
	}

});

/* -- Jalankan server dgn listen() --  */
server.listen(port, () => {
	  console.log(`Server is listening on port ${port} ... `);

});
