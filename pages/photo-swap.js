const carImageLink = "https://upload.wikimedia.org/wikipedia/commons/e/eb/PolonezCaroPlus.jpg"
const bicycleImageLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Brompton1.jpeg/800px-Brompton1.jpeg"

const imageLink = document.getElementById("imageLink")
const image = document.getElementById("image")

imageLink.addEventListener("mouseover", function() {
  image.setAttribute("src", bicycleImageLink)
})

imageLink.addEventListener("mouseout", function() {
  image.setAttribute("src", carImageLink)
})
