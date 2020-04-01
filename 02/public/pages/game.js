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

const background = {
  image: document.getElementById("backgroundImage"),
  pos: findPosition(document.getElementById("backgroundImage")),
  resetPos: function() {
    this.pos = findPosition(this.image)
  }
}

const fly = {
  image: document.getElementById("flyImage"),
  isFly: true,
  resetPos: function(background) {
    const verticalCenter = background.pos.y + background.image.clientHeight / 2 - this.image.clientHeight / 2
    this.image.style.top = `${verticalCenter}px`
    this.image.style.left = `${background.pos.x}px`
  },
  isMovingEast: true,
  isMovingSouth: true,
  animate: function(background, deltaX, deltaY) {
    const left = parseInt(this.image.style.left)
    const top = parseInt(this.image.style.top)
    const width = this.image.clientWidth
    const height = this.image.clientHeight

    if ((left + width) > (background.pos.x + background.image.clientWidth)) {
      this.isMovingEast = false
      if (this.isMovingSouth) {
        this.image.style.transform = "scale(-1, 1)"
      } else {
        this.image.style.transform = "scale(-1, -1)"
      }
    } else if (left < background.pos.x) {
      this.isMovingEast = true
      if (this.isMovingSouth) {
        this.image.style.transform = "scale(1, 1)"
      } else {
        this.image.style.transform = "scale(1, -1)"
      }
    }

    if ((top + height) > (background.pos.y + background.image.clientHeight)) {
      this.isMovingSouth = false
      if (this.isMovingEast) {
        this.image.style.transform = "scale(1, -1)"
      } else {
        this.image.style.transform = "scale(-1, -1)"
      }
    } else if (top < background.pos.y) {
      this.isMovingSouth = true
      if (this.isMovingEast) {
        this.image.style.transform = "scale(1, 1)"
      } else {
        this.image.style.transform = "scale(-1, 1)"
      }
    }

    if (this.isMovingEast) {
      this.image.style.left = left + deltaX + "px"
    } else {
      this.image.style.left = left - deltaX + "px"
    }

    if (this.isMovingSouth) {
      this.image.style.top = top + deltaY + "px"
    } else {
      this.image.style.top = top - deltaY + "px"
    }
  }
}

function init() {
  background.resetPos()
  fly.resetPos(background)
}

const flySrc = "../img/fly.png"
const spiderSrc = "../img/spider.png"

var points = 0
var animationSpeed = 4

const pointsInfo = document.getElementById("pointsInfo")

init()

window.addEventListener("resize", init)

window.addEventListener("load", init)

window.setInterval(function() {
  fly.animate(background, animationSpeed, animationSpeed)
}, 16)

window.setInterval(function() {
  if (!fly.isFly) {
    fly.image.src = flySrc
    fly.isFly = true
  } else {
    if (Math.random() * 10 > 8) {
      fly.image.src = spiderSrc
      fly.isFly = false
    }
  }
}, 1000)

fly.image.addEventListener("click", function() {
  if (fly.isFly) {
    ++points
  } else {
    points -= 5
  }
  pointsInfo.innerText = `Punkty: ${points}`
})

background.image.addEventListener("click", function() {
  --points
  pointsInfo.innerText = `Punkty: ${points}`
})
