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

const fly = {
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

function init() {
  starfield.resetPos()
  fly.resetPos(starfield)
}

var animationSpeed = 2
const buttonSpeedUp = document.getElementById("buttonSpeedUp")
const buttonSlowDown = document.getElementById("buttonSlowDown")
const currentSpeedInfo = document.getElementById("currentSpeedInfo")

init()

window.addEventListener("resize", init)

window.addEventListener("load", init)

buttonSpeedUp.addEventListener("click", function() {
  animationSpeed += 1
  currentSpeedInfo.innerText = animationSpeed
})

buttonSlowDown.addEventListener("click", function() {
  if (animationSpeed > 0) {
    animationSpeed -= 1
    currentSpeedInfo.innerText = animationSpeed
  }
})

window.setInterval(function() {
  fly.animate(starfield, animationSpeed)
}, 16)
