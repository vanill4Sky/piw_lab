import * as c from "./constants.js"

export class Map {
  constructor(level) {
    this.bb = {}
    this.loadLevel(level)
  }

  loadLevel(level) {
    this.cols = level.map((row) => row.length)
    this.levelHeight = level.length
    this.tileHeight = c.width / Math.max(...this.cols)
    this.currentLevel = level
    this.calcBoundingBoxes()
  }

  calcBoundingBoxes() {
    for (let y = 0; y < this.levelHeight; ++y) {
      const levelWidth = this.currentLevel[y].length
      const tileWidth = c.width / levelWidth
      for (let x = 0; x < levelWidth; ++x) {
        const tileValue = this.currentLevel[y][x]
        if (tileValue !== 0) {
          this.bb[[y, x]] = {
            top: y * this.tileHeight,
            bottom: (y + 1) * this.tileHeight,
            left: x * tileWidth,
            right: (x + 1) * tileWidth
          }
        }
      }
    }
  }

  drawLevel(ctx) {
    ctx.beginPath()
    for (let y = 0; y < this.levelHeight; ++y) {
      const levelWidth = this.currentLevel[y].length
      const tileWidth = c.width / levelWidth
      for (let x = 0; x < levelWidth; ++x) {
        const tileValue = this.currentLevel[y][x]
        if (tileValue !== 0) {
          ctx.fillStyle = this.chooseColor(this.currentLevel[y][x])
          ctx.fillRect(x * tileWidth, y * this.tileHeight, tileWidth, this.tileHeight)
          ctx.strokeStyle = "white"
          ctx.rect(x * tileWidth, y * this.tileHeight, tileWidth, this.tileHeight)
          ctx.stroke()
        }
      }
    }
    ctx.closePath()
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
