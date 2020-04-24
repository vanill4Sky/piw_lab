import { Vec2 } from "./modules/vec2.js"

const menuWidth = 100

class Paint {
  constructor() {
    this.canvasWrapper = document.getElementById("canvasWrapper")
    this.canvas = document.getElementById("canvas")
    this.canvasTemp = document.getElementById("canvasTemp")
    this.canvasCtx = this.canvas.getContext("2d")
    this.canvasTempCtx = this.canvasTemp.getContext("2d")
    this.menu = document.getElementById("menu")
    this.colorPicker = document.getElementById("colorPicker")
    this.shapeSelector = document.getElementById("shapeSelector")

    this.startPoint = new Vec2(0, 0)
    this.currentColor = this.colorPicker.value
    this.currentShape = "rectOutline"
    this.isMouseDown = false

    this.initElements()
  }

  initElements() {
    this.canvasTemp.addEventListener("mousedown", (e) => {
      this.startPoint = getMousePosition(this.canvasTemp, e)
      this.isMouseDown = true
    })

    this.canvasTemp.addEventListener("mousemove", (e) => {
      if (!this.isMouseDown) {
        return
      }

      const endPoint = getMousePosition(this.canvasTemp, e)
      const elementPos = this.calcElementPos(this.startPoint, endPoint)
      const elementSize = this.calcElementSize(this.startPoint, endPoint)

      this.canvasTempCtx.clearRect(0, 0, this.canvasTemp.width, this.canvasTemp.height)
      this.draw(this.canvasTempCtx, this.currentShape, elementPos, elementSize)
    })

    this.canvasTemp.addEventListener("mouseup", (e) => {
      this.isMouseDown = false
      this.canvasTempCtx.clearRect(0, 0, this.canvasTemp.width, this.canvasTemp.height)
      const endPoint = getMousePosition(this.canvasTemp, e)
      const elementPos = this.calcElementPos(this.startPoint, endPoint)
      const elementSize = this.calcElementSize(this.startPoint, endPoint)

      this.draw(this.canvasCtx, this.currentShape, elementPos, elementSize)
    })

    this.colorPicker.addEventListener("change", () => {
      this.currentColor = this.colorPicker.value
    })

    for (const row of this.shapeSelector.children) {
      for (const button of row.children) {
        button.addEventListener("click", () => {
          this.currentShape = button.value
          this.clearShapeSelector()
          button.classList.add("active")
        })
      }
    }
  }

  clearShapeSelector() {
    for (const row of this.shapeSelector.children) {
      for (const button of row.children) {
        button.class = button.classList.remove("active")
      }
    }
  }

  draw(ctx, shape, pos, size) {
    ctx.beginPath()
    ctx.strokeStyle = this.currentColor
    switch (shape) {
      case "rectOutline":
        ctx.rect(pos.x, pos.y, size.x, size.y)
        ctx.stroke()
        break
      case "rect":
        ctx.fillStyle = this.currentColor
        ctx.fillRect(pos.x, pos.y, size.x, size.y)
        break
      case "circleOutline":
        ctx.arc(this.startPoint.x, this.startPoint.y, Math.sqrt(Math.pow(size.x, 2) + Math.pow(size.y, 2)), 0, 2 * Math.PI)
        ctx.stroke()
        break
      case "circle":
        ctx.fillStyle = this.currentColor
        ctx.arc(this.startPoint.x, this.startPoint.y, Math.sqrt(Math.pow(size.x, 2) + Math.pow(size.y, 2)), 0, 2 * Math.PI)
        ctx.fill()
        break
    }
  }

  calcElementPos(start, end) {
    const elementPos = end.copy()
    if (start.x < elementPos.x) {
      elementPos.x = start.x
    }
    if (start.y < elementPos.y) {
      elementPos.y = start.y
    }
    return elementPos
  }

  calcElementSize(start, end) {
    return Vec2.abs(Vec2.sub(start, end))
  }

  resizeCanvas() {
    this.canvas.width = this.canvasWrapper.clientWidth - menuWidth
    this.canvas.height = this.canvasWrapper.clientHeight
    this.canvasTemp.width = this.canvasWrapper.clientWidth - menuWidth
    this.canvasTemp.height = this.canvasWrapper.clientHeight
    this.canvasTemp.style.marginTop = -this.canvas.height - 2 + "px"
    this.menu.style.width = menuWidth + "px"
    this.menu.style.height = this.canvasWrapper.clientHeight + "px"
    this.menu.style.position = "absolute"

    this.canvasTemp.style.marginLeft = menuWidth + "px"
    this.canvas.style.marginLeft = menuWidth + "px"
  }
}

function getMousePosition(canvas, event) {
  const canvasRect = canvas.getBoundingClientRect()

  return new Vec2(
    event.clientX - canvasRect.left,
    event.clientY - canvasRect.top
  )
}

function init() {
  const paint = new Paint()
  paint.resizeCanvas()
  // window.addEventListener("resize", paint.resizeCanvas, false)
}

window.addEventListener("load", init)
