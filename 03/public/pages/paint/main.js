import { Vec2 } from "./modules/vec2.js"

class Paint {
  constructor() {
    this.canvasWrapper = document.getElementById("canvasWrapper")
    this.canvas = document.getElementById("canvas")
    this.canvasTemp = document.getElementById("canvasTemp")
    this.canvasCtx = this.canvas.getContext("2d")
    this.canvasTempCtx = this.canvasTemp.getContext("2d")

    this.startPoint = new Vec2(0, 0)
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
      const elementPos = endPoint.copy()
      if (this.startPoint.x < elementPos.x) {
        elementPos.x = this.startPoint.x
      }
      if (this.startPoint.y < elementPos.y) {
        elementPos.y = this.startPoint.y
      }
      const elementSize = Vec2.abs(Vec2.sub(this.startPoint, endPoint))

      this.canvasTempCtx.clearRect(0, 0, this.canvasTemp.width, this.canvasTemp.height)
      this.canvasTempCtx.beginPath()
      this.canvasTempCtx.rect(elementPos.x, elementPos.y, elementSize.x, elementSize.y)
      this.canvasTempCtx.stroke()
    })

    this.canvasTemp.addEventListener("mouseup", (e) => {
      this.isMouseDown = false
      this.canvasTempCtx.clearRect(0, 0, this.canvasTemp.width, this.canvasTemp.height)
      const endPoint = getMousePosition(this.canvasTemp, e)
      const elementPos = endPoint.copy()
      if (this.startPoint.x < elementPos.x) {
        elementPos.x = this.startPoint.x
      }
      if (this.startPoint.y < elementPos.y) {
        elementPos.y = this.startPoint.y
      }
      const elementSize = Vec2.abs(Vec2.sub(this.startPoint, endPoint))

      this.canvasCtx.beginPath()
      this.canvasCtx.rect(elementPos.x, elementPos.y, elementSize.x, elementSize.y)
      console.log(elementPos, elementSize)
      this.canvasCtx.stroke()
    })
  }

  resizeCanvas() {
    this.canvas.width = this.canvasWrapper.clientWidth
    this.canvas.height = this.canvasWrapper.clientHeight
    this.canvasTemp.width = this.canvasWrapper.clientWidth
    this.canvasTemp.height = this.canvasWrapper.clientHeight
    this.canvasTemp.style.marginTop = -this.canvas.height + "px"
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
