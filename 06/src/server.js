const fs = require("fs")
const http = require("http")
const url = require("url")
const os = require("os")
const moment = require("moment")
const oneLinerJoke = require("one-liner-joke")

http
	.createServer(function (req, res) {
		res.writeHead(200, { "Content-Type": "text/html" })

		res.write(`<head><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kognise/water.css@latest/dist/dark.min.css"></head>`)
		switch (url.parse(req.url).pathname) {
		case "/ping":
			res.write(`pong`)
			break
		case "/datetime":
			res.write(moment().format())
			break
		case "/cpus":
			res.write(JSON.stringify(os.cpus()))
			break
		case "/env":
			res.write(JSON.stringify(process.env))
			break
		case "/joke":
			res.write(oneLinerJoke.getRandomJoke().body.toString())
			break
		case "/somedata":
			res.write(fs.readFileSync("./assets/example.json", "utf8"))
			break
		default:
			res.write(
				`<h1>Lista endpointów</h1> 
				<br><a href="/ping">/ping</a>
				<br><a href="/datetime">/datetime</a>
				<br><a href="/cpus">/cpus</a>
				<br><a href="/env">/env</a>
				<br><a href="/joke">/joke</a>
				<br><a href="/somedata">/somedata</a>`
			)
			break
		}

		res.end()
	}).listen(8088)