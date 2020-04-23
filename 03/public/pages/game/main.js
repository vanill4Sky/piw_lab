"use strict"

import { width, height, resultatnSpeed } from "./modules/constants.js"
import { Vec2 } from "./modules/vec2.js"

import { Ball } from "./modules/ball.js"
import { Paddle } from "./modules/paddle.js"
import { Map } from "./modules/map.js"
class Game {
  constructor() {
    this.canvas = document.getElementById("gameMapCanvas")
    this.ctx = this.canvas.getContext("2d")
    this.map = new Map(testLevel)
    this.ball = new Ball(10, new Vec2(250, 250), new Vec2(-1, -1), "#C25C19")
    this.paddle = new Paddle(new Vec2(100, 20), new Vec2(250, 40), 5, "#C25C19")
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
    window.addEventListener("keydown", (e) => {
      this.keyboardState[e.key] = true
    })
    window.addEventListener("keyup", (e) => {
      this.keyboardState[e.key] = false
    })
    this.resetEntitiesPosition()
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

  update(dt) {
    const ballNextPosition = this.ball.nextPosition(dt)
    const paddleNextPosition = this.paddle.nextPosition(dt)

    const ballBoundingBox = this.ball.boundingBox(ballNextPosition)
    const paddleBoundingBox = this.paddle.boundingBox(paddleNextPosition)

    // walls
    this.ball.changeDirection(this.collider.collisionBallBorders(ballBoundingBox))

    if (this.collider.collisionPaddleBorders(paddleBoundingBox)) {
      this.paddle.changeDirection(0)
    }

    // ball and tiles
    const collisionBallTiles = this.collider.collisionBallTiles(ballBoundingBox)
    if (collisionBallTiles) {
      this.ball.changeDirection(collisionBallTiles.collision)
      this.map.currentLevel[collisionBallTiles.tile.y][collisionBallTiles.tile.x] -= 1
    }

    // ball and paddle
    const collisionBallPaddle = this.collider.collisionBallPaddle(ballBoundingBox, paddleBoundingBox)
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

    if (!this.ballPaused) {
      this.ball.move(dt)
    }
    this.paddle.move(dt)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.map.loadLevel(testLevel)
    this.map.drawLevel(this.ctx)
    this.ball.draw(this.ctx)
    this.paddle.draw(this.ctx)
  }

  resetEntitiesPosition() {
    this.paddle.pos = new Vec2((width - this.paddle.size.x) / 2, height - 2 * this.paddle.size.y)
    this.ball.pos.x = this.paddle.pos.x + this.paddle.size.x / 2
    this.ball.pos.y = this.paddle.pos.y - this.ball.size * 2
    this.ball.dir = new Vec2(-1, -1)
    this.ball.speed = new Vec2(resultatnSpeed / 2, resultatnSpeed / 2)
  }
}

const testLevel = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1]
]

class Collider {
  constructor(map, ball, paddle) {
    this.map = map
    this.ball = ball
    this.paddle = paddle
  }

  collisionBallBorders(bb) {
    const collision = new Vec2(false, false)

    if (bb.left < 0 || bb.right >= width) {
      collision.x = true
    }
    if (bb.top < 0 || bb.bottom >= height) {
      collision.y = true
    }

    return collision
  }

  // it takes ball bounding box in the next position
  collisionBallTiles(bbBall) {
    const collision = new Vec2(false, false)

    for (let y = 0; y < this.map.levelHeight; ++y) {
      const levelWidth = this.map.currentLevel[y].length
      for (let x = 0; x < levelWidth; ++x) {
        if (this.map.currentLevel[y][x] !== 0) {
          const bbTile = this.map.bb[[y, x]]

          if ((bbBall.bottom >= bbTile.top && bbBall.top <= bbTile.bottom) &&
            ((bbBall.right >= bbTile.left && bbBall.left < bbTile.left) ||
              (bbBall.left <= bbTile.right && bbBall.right > bbTile.right))) {
            collision.x = true
          } else if ((bbBall.right >= bbTile.left && bbBall.left <= bbTile.right) &&
            ((bbBall.top <= bbTile.bottom && bbBall.bottom > bbTile.bottom) ||
              (bbBall.bottom >= bbTile.top && bbBall.top < bbTile.top))) {
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

  collisionPaddleBorders(bb) {
    return (bb.left < 0) || (bb.right > width)
  }

  collisionBallPaddle(bbBall, bbPaddle) {
    if (bbBall.bottom >= bbPaddle.top) {
      if (bbBall.left <= bbPaddle.right && bbBall.right >= bbPaddle.left) {
        const paddleSizeRelative = this.paddle.size.x + 2 * this.ball.bbSize
        const ballLeftRelative = bbBall.right - bbPaddle.left
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

var updatesPerFrame = 2
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
