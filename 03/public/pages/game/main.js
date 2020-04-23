"use strict"

import { Vec2 } from "./modules/vec2.js"

const width = document.getElementById("gameMapCanvas").width
const height = document.getElementById("gameMapCanvas").height
const resultatnSpeed = 10

class Game {
  constructor() {
    this.map = new Map(document.getElementById("gameMapCanvas"))
    this.ball = new Ball()
    this.paddle = new Paddle()
    this.collider = new Collider(this.map, this.ball, this.paddle)
    this.ballPaused = true

    this.keyboardState = {
      ArrowLeft: false,
      ArrowRight: false
    }
    this.isPauseButtonPressed = false

    this.init()
  }

  init() {
    this.resetEntitiesPosition()
    this.initInput()
    this.draw()
  }

  mainLoop(dt) {
    this.handleInput()
    this.update(dt)
    this.draw()
  }

  handleInput() {
    if (this.keyboardState.ArrowLeft) {
      this.paddle.changeDirection(-1)
    } else if (this.keyboardState.ArrowRight) {
      this.paddle.changeDirection(1)
    } else {
      this.paddle.changeDirection(0)
    }

    if (this.keyboardState[" "]) {
      this.isPauseButtonPressed = true
    }
    if ((this.keyboardState[" "] === false) && this.isPauseButtonPressed) {
      this.ballPaused = !this.ballPaused
      this.isPauseButtonPressed = false
    }
  }

  initInput() {
    window.addEventListener("keydown", (e) => {
      this.keyboardState[e.key] = true
    })
    window.addEventListener("keyup", (e) => {
      this.keyboardState[e.key] = false
    })
  }

  update(dt) {
    this.ball.changeDirection(this.collider.collisionBallBorders(dt))

    const collisionBallTiles = this.collider.collisionBallTiles(dt)
    if (collisionBallTiles) {
      this.ball.changeDirection(collisionBallTiles.collision)
      this.map.currentLevel[collisionBallTiles.tile.y][collisionBallTiles.tile.x] -= 1
    }

    const collisionBallPaddle = this.collider.collisionBallPaddle(dt)
    if (collisionBallPaddle) {
      if (collisionBallPaddle.collision) {
        this.ball.dir.y *= -1
        if (collisionBallPaddle.relativePos >= 0) {
          this.ball.dir.x = 1
        } else {
          this.ball.dir.x = -1
        }
        const factor = Math.abs((collisionBallPaddle.relativePos * 2) * 0.8)
        this.ball.speed.y = resultatnSpeed * (1 - factor)
        this.ball.speed.x = resultatnSpeed - this.ball.speed.y
      } else if (collisionBallPaddle.collision === false) {
        this.ballPaused = true
        this.resetEntitiesPosition()
      }
    }

    if (this.collider.collisionPaddleBorders(dt)) {
      this.paddle.changeDirection(0)
    }

    if (!this.ballPaused) {
      this.ball.move(dt)
    }
    this.paddle.move(dt)
  }

  draw() {
    this.map.ctx.clearRect(0, 0, this.map.canvas.width, this.map.canvas.height)
    this.map.loadLevel(testLevel)
    this.map.drawLevel()
    this.ball.draw(this.map.ctx)
    this.paddle.draw(this.map.ctx)
  }

  resetEntitiesPosition() {
    this.paddle.pos = new Vec2((width - this.paddle.size.x) / 2, height - 2 * this.paddle.size.y)
    this.ball.pos.x = this.paddle.pos.x + this.paddle.size.x / 2
    this.ball.pos.y = this.paddle.pos.y - this.ball.size * 2
    this.ball.dir = new Vec2(-1, -1)
    this.ball.speed = new Vec2(resultatnSpeed / 2, resultatnSpeed / 2)
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
        return "#0DE0FF"
      case 2:
        return "#007DFF"
      case 3:
        return "#05106E"
    }
  }
}

const testLevel = [
  [0, 2, 3, 2, 0, 0, 0, 2, 3, 2, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0],
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 1]
]

class Ball {
  constructor() {
    this.size = 10
    this.pos = new Vec2(100, 250)
    this.dir = new Vec2(-1, -1)
    this.speed = new Vec2(resultatnSpeed / 2, resultatnSpeed / 2)
    this.color = "#C25C19"
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

class Paddle {
  constructor() {
    this.size = new Vec2(200, 20)
    this.pos = new Vec2((width - this.size.x) / 2, height - 2 * this.size.y)
    this.speed = 20
    this.dir = 0
    this.color = "#C25C19"
  }

  changeDirection(dir) {
    this.dir = dir
  }

  move(dt) {
    this.pos.x += (this.speed * this.dir * dt)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    ctx.closePath()
  }
}

class Collider {
  constructor(map, ball, paddle) {
    this.map = map
    this.ball = ball
    this.paddle = paddle
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

  collisionBallTiles(dt) {
    const collision = new Vec2(false, false)
    const newBallPos = this.ball.pos.add(this.ball.dir.mul(this.ball.speed).mul(dt))
    const bbSize = this.ball.size * 0.5
    const newBallTop = +newBallPos.y - bbSize
    const newBallBottom = +newBallPos.y + bbSize
    const newBallLeft = +newBallPos.x - bbSize
    const newBallRight = +newBallPos.x + bbSize

    const cols = this.map.currentLevel.map((value) => value.length)
    const maxColumnLength = Math.max(...cols)
    const levelHeight = this.map.currentLevel.length
    const tileHeight = width / maxColumnLength

    for (let y = 0; y < levelHeight; ++y) {
      const levelWidth = this.map.currentLevel[y].length
      const tileWidth = width / levelWidth
      for (let x = 0; x < levelWidth; ++x) {
        if (this.map.currentLevel[y][x] !== 0) {
          const tileTop = y * tileHeight
          const tileBottom = (y + 1) * tileHeight
          const tileLeft = x * tileWidth
          const tileRight = (x + 1) * tileWidth

          if ((newBallBottom >= tileTop && newBallTop <= tileBottom) &&
            ((newBallRight >= tileLeft && newBallLeft < tileLeft) ||
              (newBallLeft <= tileRight && newBallRight > tileRight))) {
            collision.x = true
          } else if ((newBallRight >= tileLeft && newBallLeft <= tileRight) &&
            ((newBallTop <= tileBottom && newBallBottom > tileBottom) ||
              (newBallBottom >= tileTop && newBallTop < tileTop))) {
            collision.y = true
          }

          if (collision.x || collision.y) {
            return {
              collision: collision,
              tile: new Vec2(x, y)
            }
          }
        }
      }
    }

    return null
  }

  collisionPaddleBorders(dt) {
    const paddleNextPosLeft = this.paddle.pos.x + this.paddle.speed * this.paddle.dir * dt

    return (paddleNextPosLeft < 0) || ((paddleNextPosLeft + this.paddle.size.x) > width)
  }

  collisionBallPaddle(dt) {
    const paddleNextPosLeft = this.paddle.pos.x + this.paddle.speed * this.paddle.dir * dt
    const paddleNextPosRight = this.paddle.pos.x + this.paddle.speed * this.paddle.dir * dt + this.paddle.size.x
    const newBallPos = this.ball.pos.add(this.ball.dir.mul(this.ball.speed).mul(dt))
    const bbSize = this.ball.size * 0.5
    const newBallBottom = +newBallPos.y + bbSize
    const newBallLeft = +newBallPos.x - bbSize
    const newBallRight = +newBallPos.x + bbSize

    if (newBallBottom >= this.paddle.pos.y) {
      if (newBallLeft <= paddleNextPosRight && newBallRight >= paddleNextPosLeft) {
        const paddleSizeRelative = this.paddle.size.x + 2 * bbSize
        const ballLeftRelative = newBallRight - paddleNextPosLeft
        return {
          collision: true,
          relativePos: (ballLeftRelative / paddleSizeRelative) - 0.5
        }
      } else {
        return {
          collision: false
        }
      }
    }
    return null
  }
}

const game = new Game()

var updatesPerFrame = 3
var updatesCounter = 0
window.setInterval(() => {
  if (updatesCounter === updatesPerFrame) {
    game.draw()
    updatesCounter = 0
  }
  game.handleInput()
  game.update(1 / updatesPerFrame)
  updatesCounter++
}, 16 / updatesPerFrame)
