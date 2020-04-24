import { Vec2 } from "./vec2.js"

export class Paddle {
  constructor(size, pos, speed, color) {
    this.size = size
    this.pos = pos
    this.speed = speed
    this.dir = 0
    this.color = color
  }

  changeDirection(dir) {
    this.dir = dir
  }

  nextPosition(dt) {
    return new Vec2(this.pos.x + this.speed * this.dir * dt, this.pos.y)
  }

  move(dt) {
    this.pos.x = this.nextPosition(dt).x
  }

  boundingBox(position) {
    return {
      left: position.x,
      right: position.x + this.size.x,
      top: position.y,
      bottom: position.y + this.size.y
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y)
    ctx.closePath()
  }
}
