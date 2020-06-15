const axios = require('axios');

function getCatImage() {
	const catImage = document.getElementById("catImage")

	axios.get("https://aws.random.cat/meow")
		.then(function (response) {
			catImage.src = response.data.file;
		})
		.catch(function (error) {
			console.log(error);
		})
}

function updateCatFacts(factCount) {
	const catFactsList = document.getElementById("catFactsList")
	catFactsList.innerHTML = ""

	axios.get(`https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=${factCount}`)
		.then(function (response) {
			response.data.forEach(element => {
				const listItem = document.createElement("li")
				listItem.setAttribute("class", "list-group-item list-group-item-action")
				listItem.innerText = element.text
				catFactsList.appendChild(listItem)
			});
		})
		.catch(function (error) {
			console.log(error);
		})
}

getCatImage()
updateCatFacts(10)