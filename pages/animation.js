function findPosition(node) {
  const pos = { x: 0, y: 0 }

  if (node.offsetParent) {
    do {
      pos.x += node.offsetLeft
      pos.y += node.offsetTop
      node = node.offsetParent
    } while (node)

    return pos
  }
}

const starfield = {
  image: document.getElementById("starfieldImage"),
  pos: findPosition(document.getElementById("starfieldImage")),
  resetPos: function() {
    this.pos = findPosition(this.image)
  }
}

const rocketship = {
  image: document.getElementById("rocketshipImage"),
  resetPos: function(starfield) {
    const verticalCenter = starfield.pos.y + starfield.image.clientHeight / 2 - this.image.clientHeight / 2
    this.image.style.top = `${verticalCenter}px`
    this.image.style.left = `${starfield.pos.x}px`
  },
  isMovingEast: true,
  animate: function(starfield, delta) {
    const rocketshipLeft = parseInt(this.image.style.left)
    if ((rocketshipLeft + this.image.clientWidth) > (starfield.pos.x + starfield.image.clientWidth)) {
      this.isMovingEast = false
      this.image.style.transform = "scaleX(-1)"
    } else if (rocketshipLeft < starfield.pos.x) {
      this.isMovingEast = true
      this.image.style.transform = "scaleX(1)"
    }

    if (this.isMovingEast) {
      this.image.style.left = parseInt(this.image.style.left) + delta + "px"
    } else {
      this.image.style.left = parseInt(this.image.style.left) - delta + "px"
    }
  }
}

starfield.resetPos()
rocketship.resetPos(starfield)

window.addEventListener("resize", function() {
  starfield.resetPos()
  rocketship.resetPos(starfield)
})

window.setInterval(function() {
  rocketship.animate(starfield, 2)
}, 16)
