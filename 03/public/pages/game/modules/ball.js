import * as c from "./constants.js"
import { Vec2 } from "./vec2.js"

export class Ball {
  constructor(size, pos, dir, color) {
    this.size = size
    this.bbSize = size * 0.5
    this.pos = pos
    this.dir = dir
    this.speed = new Vec2(c.resultatnSpeed / 2, c.resultatnSpeed / 2)
    this.color = color
  }

  changeDirection(collision) {
    if (collision.x) {
      this.dir.x *= -1
    } else if (collision.y) {
      this.dir.y *= -1
    }
  }

  nextPosition(dt) {
    return this.pos.add(this.dir.mul(this.speed).mul(dt))
  }

  move(dt) {
    this.pos = this.nextPosition(dt)
  }

  boundingBox(ballPosition = this.pos) {
    return {
      top: ballPosition.y - this.bbSize,
      bottom: ballPosition.y + this.bbSize,
      left: ballPosition.x - this.bbSize,
      right: ballPosition.x + this.bbSize
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}
