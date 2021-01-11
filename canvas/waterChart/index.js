function WaterCahrt(id, data) {
  let canvas = document.getElementById(id)
  let ctx = canvas.getContext('2d')
  let canvasWidth = canvas.width > canvas.height ? canvas.height : canvas.width
  let r = canvasWidth * 0.8 / 2
  let offset = 0
  this.canvas = canvas
  this.ctx = ctx
  this.data = data
  this.r = r
  this.center = canvasWidth / 2
  this.intervalId = null
  Object.defineProperty(this, 'offset', {
    enumerable: false,
    configurable: false,
    get() {
      return offset
    },
    set(val) {
      offset = val
      this.refresh()
    }
  })
}

WaterCahrt.prototype.clear = function(color = "#fafafa") {
  this.ctx.fillStyle = color
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  return this
}

WaterCahrt.prototype.draw = function() {
  this.clear('#d6d6d6')
    .drawBg()
    .drawWater(this.center - this.r - this.offset, (this.center - this.r) + this.r * 2 * this.data, '#2323af', true)
    .drawWater(this.center - this.r - this.offset - 20, (this.center - this.r) + this.r * 2 * this.data + 20, '#2356af')
    .drawWater(this.center - this.r - this.offset - 40, (this.center - this.r) + this.r * 2 * this.data + 40, '#2399af')
    .restore()
    .animation()
}

WaterCahrt.prototype.animation = function() {
  if(this.intervalId) {
    clearInterval(this.intervalId)
    this.intervalId = null
  }
  setInterval(() => {
    if(this.offset >= this.r*0.8) {
      this.offset = 0
    } else {
      this.offset += 2
    }
  }, 23)
  return this
}

WaterCahrt.prototype.refresh = function() {
  this.drawBg()
    .drawWater(this.center - this.r - this.offset, (this.center - this.r) + this.r * 2 * this.data, '#2323af', true)
    .drawWater(this.center - this.r - this.offset - 20, (this.center - this.r) + this.r * 2 * this.data + 20, '#2356af')
    .drawWater(this.center - this.r - this.offset - 40, (this.center - this.r) + this.r * 2 * this.data + 40, '#2399af')
    .restore()
}

WaterCahrt.prototype.drawWater = function(basex, basey, color, flag) {
  let bezier = this.getBezierPoints(basex, basey)
  this.ctx.beginPath()
  this.ctx.moveTo(this.center - this.r, this.center + this.r)
  this.ctx.lineTo(bezier.x, bezier.y)
  bezier.points.forEach((item) => {
    this.ctx.bezierCurveTo(item.cp1x, item.cp1y, item.cp2x, item.cp2y, item.x, item.y)
  })
  this.ctx.lineTo(this.center + this.r, this.center + this.r)
  this.ctx.closePath()
  this.ctx.fillStyle = color
  this.ctx.fill()
  this.ctx.font = `normal ${this.r * 0.2}px blod`
  this.ctx.textAlign = "center"
  if(flag)
    this.ctx.fillText(`${this.data * 100 | 0}%`, this.center, this.center)
  this.ctx.clip()
  this.ctx.fillStyle = '#ffffff'
  this.ctx.fillText(`${this.data * 100 | 0}%`, this.center, this.center)
  return this
}

WaterCahrt.prototype.getBezierPoints = function (basex, basey) {
  let arr = []
  let start = basex
  let  y = basey
  let base = 20
  while (start <= this.center + this.r * 1.2) {
    arr.push([start, y])
    y += base
    if (y >= basey + 20) base = -20
    if (y <= basey - 20) base = 20
    start += this.r * 0.2
  }
  let _t = [[basex - this.r * 0.2, y - 20], ...arr, [start, y + base]]
  let res = []
  for (let i = 2; i < _t.length - 1; i++) {
    res.push({
      x: _t[i][0],
      y: _t[i][1],
      cp1x: _t[i-1][0] + (_t[i-1][0] - _t[i-2][0]) / 5,
      cp1y: _t[i-1][1] + (_t[i-1][1] - _t[i-2][1]) / 5,
      cp2x: _t[i][0] - (_t[i+1][0] - _t[i-1][0]) / 5,
      cp2y: _t[i][1] - (_t[i+1][1] - _t[i-1][1]) / 5,
    })
  }
  return {
    points: res,
    x: arr[0][0],
    y: arr[0][1]
  }
}

WaterCahrt.prototype.drawBg  = function() {
  this.ctx.save()
  return this.fillArc(this.center, this.center, this.r, 0, 7, false, '#2323fa')
    .fillArc(this.center, this.center, this.r - 5, 0, 7, false, '#ffffff')
    .fillArc(this.center, this.center, this.r - 10, 0, 7, false, '#eaeaea')
    .clipArc(this.center, this.center, this.r - 10)
}

WaterCahrt.prototype.restore = function() {
  this.ctx.restore()
  return this
}

WaterCahrt.prototype.clipArc = function(x, y, r) {
  this.ctx.beginPath()
  this.ctx.arc(x, y, r, 0, 7, false)
  this.ctx.clip()
  return this
}

WaterCahrt.prototype.fillArc = function(x, y, r, startAngle, endAngle, flag, color) {
  this.ctx.beginPath()
  this.ctx.arc(x, y, r, startAngle, endAngle, flag)
  this.ctx.fillStyle = color
  this.ctx.fill()
  return this
}

new WaterCahrt('canvas', 0.5).draw()
