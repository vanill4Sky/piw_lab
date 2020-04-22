import { Vec2 } from "./modules/vec2.js"

const width = document.getElementById("gameMapCanvas").width
const height = document.getElementById("gameMapCanvas").height

class Game {
  constructor() {
    this.map = new Map(document.getElementById("gameMapCanvas"))
    this.ball = new Ball()
    this.collider = new Collider(this.map, this.ball, null)

    this.init()
  }

  init() {
    this.draw()
  }

  mainLoop() {
    this.handleInput()
    this.update(0.5)
    this.draw()
  }

  handleInput() {

  }

  update(dt) {
    this.ball.changeDirection(this.collider.collisionBallBorders(dt))
    this.ball.move(dt)
  }

  draw() {
    this.map.ctx.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height)
    this.map.loadLevel(testLevel)
    this.map.drawLevel()
    this.ball.draw(this.map.ctx)
  }
}

class Map {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.currentLevel = {}
  }

  loadLevel(level) {
    this.currentLevel = level
  }

  drawLevel() {
    const cols = this.currentLevel.map((value) => value.length)
    const maxColumnLength = Math.max(...cols)
    const levelHeight = this.currentLevel.length
    const tileHeight = width / maxColumnLength

    this.ctx.beginPath()
    for (let y = 0; y < levelHeight; ++y) {
      const levelWidth = this.currentLevel[y].length
      const tileWidth = width / levelWidth
      for (let x = 0; x < levelWidth; ++x) {
        const tileValue = this.currentLevel[y][x]
        if (tileValue !== 0) {
          this.ctx.fillStyle = this.chooseColor(this.currentLevel[y][x])
          this.ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight)
          this.ctx.strokeStyle = "white"
          this.ctx.rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight)
          this.ctx.stroke()
        }
      }
    }
    this.ctx.closePath()
  }

  chooseColor(tileValue) {
    switch (tileValue) {
      case 1:
        return "#00FF00"
      case 2:
        return "#0000FF"
    }
  }
}

const testLevel = [
  [0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0]
]

class Ball {
  constructor() {
    this.size = 20
    this.pos = new Vec2(250, 50)
    this.dir = new Vec2(-1, -1)
    this.speed = new Vec2(10, 10)
    this.color = "red"
  }

  changeDirection(collision) {
    if (collision.x) {
      this.dir.x *= -1
    }
    if (collision.y) {
      this.dir.y *= -1
    }
  }

  move(dt) {
    this.pos = this.pos.add(this.dir.mul(this.speed).mul(dt))
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}

class Collider {
  constructor(map, ball, pane) {
    this.map = map
    this.ball = ball
    this.pane = pane
  }

  collisionBallBorders(dt) {
    const collision = new Vec2(false, false)
    const newBallPos = this.ball.pos.add(this.ball.dir.mul(this.ball.speed).mul(dt))

    if ((newBallPos.x - this.ball.size) < 0 || (newBallPos.x + this.ball.size) >= width) {
      collision.x = true
    }
    if ((newBallPos.y - this.ball.size) < 0 || (newBallPos.y + this.ball.size) >= height) {
      collision.y = true
    }

    return collision
  }
}

const game = new Game()

window.setInterval(() => {
  game.mainLoop()
}, 16)
