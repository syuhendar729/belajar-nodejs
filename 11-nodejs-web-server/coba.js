/* === Nodejs web server ===
 * 
 *  dgn module `http`
 * http.createServer(callback(require, respon))
 *.listen(port, hostname, callback())
 *
 * */

const http = require("http")
const fs = require("fs")
const port = 3000

const renderHtml = (page, res) => {
	fs.readFile(`./pages/${page}.html`, 'utf8', (err, data) => {
		if (err) {
			res.writeHead(404)
			res.end(err)
		}
		res.end(data)
	})
}

const server = http.createServer( (req, res) => {
	res.writeHead(200, {
		"Content-Type": "text/html"
	})

	const url = req.url
	switch(url){
		case '/about':
			renderHtml('about', res)
			break
		case '/contact':
			renderHtml('contact', res)
			break
		default:
			renderHtml('index', res)
			break
	}
} )

server.listen(port, () => {
	console.log(`Server berjalan di port ${port} ...`)
})
