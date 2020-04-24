import * as c from "./constants.js"
import { Vec2 } from "./vec2.js"

export class Collider {
  collisionBallBorders(bb) {
    const collision = new Vec2(false, false)

    if (bb.left < 0 || bb.right >= c.width) {
      collision.x = true
    }
    if (bb.top < 0 || bb.bottom >= c.height) {
      collision.y = true
    }

    return collision
  }

  // it takes ball bounding box in the next position
  collisionBallTiles(bbBall, bbMap) {
    const collision = new Vec2(false, false)

    for (const coords in bbMap) {
      const bbTile = bbMap[coords]
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
        const coordsSplit = coords.split(",")
        return {
          collision: collision,
          tile: new Vec2(parseInt(coordsSplit[1], 10), parseInt(coordsSplit[0], 10))
        }
      }
    }

    return null
  }

  collisionPaddleBorders(bb) {
    return (bb.left < 0) || (bb.right > c.width)
  }

  collisionBallPaddle(bbBall, bbPaddle) {
    if (bbBall.bottom >= bbPaddle.top) {
      if (bbBall.left <= bbPaddle.right && bbBall.right >= bbPaddle.left) {
        const paddleSizeRelative =
          (bbPaddle.right - bbPaddle.left) + (bbBall.right - bbBall.left)
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
