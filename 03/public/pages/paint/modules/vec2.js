export class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(other) {
    this.x += other.x
    this.y += other.y
    return this
  }

  sub(other) {
    this.x -= other.x
    this.y -= other.y
    return this
  }

  copy() {
    return new Vec2(this.x, this.y)
  }

  static sub(lhs, rhs) {
    return new Vec2(lhs.x - rhs.x, lhs.y - rhs.y)
  }

  static abs(vec2) {
    return new Vec2(Math.abs(vec2.x), Math.abs(vec2.y))
  }
}
