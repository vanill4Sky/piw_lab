const axios = require("axios").default

function printResponse(response) {
	const payload = response.data

	console.log(`ID odpowiedzi: ${payload.id}`)
	console.log(`Tytuł: ${payload.title} `)

	let text_lines = payload.body.split("\n").reduce((previous, current) => {
		return previous + "\n\t" + current
	})
	console.log(`Tekst:	${text_lines}`)
}

axios.get("https://jsonplaceholder.typicode.com/posts/1")
	.then(function (response) {
		printResponse(response)
	})
	.catch(function (error) {
		// handle error
		console.log(error)
	})
	.finally(function () {
		// always executed
	})