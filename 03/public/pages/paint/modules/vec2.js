export class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(rhs) {
    if (rhs.x !== undefined && rhs.y !== undefined) {
      return new Vec2(this.x + rhs.x, this.y + rhs.y)
    } else {
      return new Vec2(this.x + rhs, this.y + rhs)
    }
  }

  sub(rhs) {
    if (rhs.x !== undefined && rhs.y !== undefined) {
      return new Vec2(this.x - rhs.x, this.y - rhs.y)
    } else {
      return new Vec2(this.x - rhs, this.y - rhs)
    }
  }

  mul(rhs) {
    if (rhs.x !== undefined && rhs.y !== undefined) {
      return new Vec2(this.x * +rhs.x, this.y * rhs.y)
    } else {
      return new Vec2(this.x * +rhs, this.y * rhs)
    }
  }

  copy() {
    return new Vec2(this.x, this.y)
  }

  static add(lhs, rhs) {
    if (rhs.x !== undefined && rhs.y !== undefined) {
      return new Vec2(lhs.x + rhs.x, lhs.y + rhs.y)
    } else {
      return new Vec2(lhs.x + rhs, lhs.y + rhs)
    }
  }

  static sub(lhs, rhs) {
    if (rhs.x !== undefined && rhs.y !== undefined) {
      return new Vec2(lhs.x - rhs.x, lhs.y - rhs.y)
    } else {
      return new Vec2(lhs.x - rhs, lhs.y - rhs)
    }
  }

  static mul(lhs, rhs) {
    if (rhs.x !== undefined && rhs.y !== undefined) {
      return new Vec2(lhs.x * rhs.x, lhs.y * rhs.y)
    } else {
      return new Vec2(lhs.x * rhs, lhs.y * rhs)
    }
  }

  static abs(vec2) {
    return new Vec2(Math.abs(vec2.x), Math.abs(vec2.y))
  }
}
