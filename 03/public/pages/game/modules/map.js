import * as c from "./constants.js"

export class Map {
  constructor() {
    this.bb = {}
  }

  loadLevel(level) {
    delete this.bb
    this.bb = {}
    this.cols = level.map((row) => row.length)
    this.levelHeight = level.length
    this.tileHeight = c.width / Math.max(...this.cols)
    this.currentLevel = []
    for (let y = 0; y < this.levelHeight; ++y) {
      this.currentLevel[y] = level[y].slice()
    }
    this.calcBoundingBoxes()
  }

  calcBoundingBoxes() {
    for (let y = 0; y < this.levelHeight; ++y) {
      const tileWidth = c.width / this.cols[y]
      for (let x = 0; x < this.cols[y]; ++x) {
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

  hit(row, col) {
    --this.currentLevel[row][col]
    if (this.currentLevel[row][col] <= 0) {
      delete this.bb[[row, col]]
    }
  }

  drawLevel(ctx) {
    ctx.beginPath()
    for (const coords in this.bb) {
      const bbTile = this.bb[coords]
      const tileWidth = bbTile.right - bbTile.left
      const coordsSplit = coords.split(",")
      ctx.fillStyle = this.chooseColor(this.currentLevel[coordsSplit[0]][coordsSplit[1]])
      ctx.fillRect(bbTile.left, bbTile.top, tileWidth, this.tileHeight)
      ctx.strokeStyle = "white"
      ctx.rect(bbTile.left, bbTile.top, tileWidth, this.tileHeight)
      ctx.stroke()
    }
  }

  chooseColor(tileValue) {
    switch (tileValue) {
      case 1:
        return "#0DE0FF"
      case 2:
        return "#007DFF"
      case 3:
        return "#05106E"
      default:
        return "black"
    }
  }

  isClear() {
    return Object.keys(this.bb).length === 0
  }
}
