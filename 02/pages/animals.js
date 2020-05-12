const animalPicturesDir = "../img/zad3/"
const animalNames = ["bird", "cow", "crane", "dog", "gator", "pig", "reindeer", "snake", "turkey", "walrus"]

const menu = {
  htmlElement: document.getElementById("menu"),
  init: function(animalPicturesDir, animalNames) {
    for (let i = 0; i < animalNames.length; ++i) {
      const menuItem = document.createElement("a")
      menuItem.setAttribute("class", "list-group-item list-group-item-action text-center")
      menuItem.setAttribute("href", "")

      const menuItemImage = document.createElement("img")
      menuItemImage.setAttribute("id", `${animalPicturesDir}${animalNames[i]}`)
      menuItemImage.setAttribute("src", `${animalPicturesDir}${animalNames[i]}out.gif`)
      menuItemImage.setAttribute("class", "img-fluid")

      menuItem.appendChild(menuItemImage)
      menuItem.addEventListener("mouseover", function() {
        const menuItemImage = menuItem.children[0]
        const srcOut = menuItemImage.getAttribute("src")
        menuItemImage.setAttribute("src", srcOut.replace("out", "over"))

        const animalPicture = document.getElementById("animalPicture")
        animalPicture.setAttribute("src", srcOut.replace("out", ""))
      })
      menuItem.addEventListener("mouseout", function() {
        const menuItemImage = menuItem.children[0]
        const srcOver = menuItemImage.getAttribute("src")
        menuItemImage.setAttribute("src", srcOver.replace("over", "out"))

        const animalPicture = document.getElementById("animalPicture")
        animalPicture.setAttribute("src", "")
      })

      this.htmlElement.appendChild(menuItem)
    }
  }
}

menu.init(animalPicturesDir, animalNames)
