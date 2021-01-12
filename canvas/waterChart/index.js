function WaterCahrt(id, data) {
  let canvas = document.getElementById(id)
  let ctx = canvas.getContext('2d')
  let canvasWidth = canvas.width > canvas.height ? canvas.height : canvas.width
  let r = canvasWidth * 0.8 / 2
  let offset = [0, 20, 40]
  this.canvas = canvas
  this.ctx = ctx
  this.data = data
  this.r = r // 圆半径
  this.center = canvasWidth / 2 //圆心x（y）
  this.intervalId = null
  Object.defineProperty(this, 'offset', { // 定义水波图的偏移量，当偏移量发生变化时自动触发更新
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
/**
 * 清空画布
 * @param {strign} color 颜色
 */
WaterCahrt.prototype.clear = function(color = "#fafafa") { 
  this.ctx.fillStyle = color
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  return this
}
/**
 * 绘制水球图
 */
WaterCahrt.prototype.draw = function() {
  this.clear('#d6d6d6')
    .drawBg()
    .drawWater(this.center - this.r - this.offset[0], (this.center + this.r) - this.r * 2 * this.data, '#2323af', true)
    .drawWater(this.center - this.r - this.offset[1], (this.center + this.r) - this.r * 2 * this.data + 20, '#2356af')
    .drawWater(this.center - this.r - this.offset[2], (this.center + this.r) - this.r * 2 * this.data + 40, '#2399af')
    .restore()
    .animation()
}
/**
 * 开启动画
 */
WaterCahrt.prototype.animation = function() {
  if(this.intervalId) {
    clearInterval(this.intervalId)
    this.intervalId = null
  }
  setInterval(() => {
    let arr = this.offset.slice()
    for (let i in arr) {
      if(arr[i] >= this.r*0.8) {
        arr[i] = 0
      } else {
        arr[i] += 2 + i * 1
      }
    }
    this.offset = arr
  }, 23)
  return this
}
/**
 * 刷新水球图
 */
WaterCahrt.prototype.refresh = function() {
  this.drawBg()
    .drawWater(this.center - this.r - this.offset[0], (this.center + this.r) - this.r * 2 * this.data, '#2323af', true)
    .drawWater(this.center - this.r - this.offset[1], (this.center + this.r) - this.r * 2 * this.data + 20, '#2356af')
    .drawWater(this.center - this.r - this.offset[2], (this.center + this.r) - this.r * 2 * this.data + 40, '#2399af')
    .restore()
}
/**
 * 绘制水波图
 * @param {number} basex 波纹的起始x值
 * @param {number} basey 波纹的起始点y值
 * @param {strign} color 波纹颜色
 * @param {boolean} flag 是否绘制与波纹相同颜色的文字，理论上只需要最下层的波纹才需要绘制
 */
WaterCahrt.prototype.drawWater = function(basex, basey, color, flag) {
  let bezier = this.getBezierPoints(basex, basey)
  this.ctx.save()
  this.ctx.beginPath()
  this.ctx.moveTo(this.center - this.r, this.center + this.r)
  this.ctx.lineTo(bezier.x, bezier.y)
  bezier.points.forEach((item) => {
    this.ctx.bezierCurveTo(item.cp1x, item.cp1y, item.cp2x, item.cp2y, item.x, item.y)
  })
  this.ctx.lineTo(this.center + this.r, this.center + this.r)
  this.ctx.closePath()
  this.ctx.fillStyle = color
  this.ctx.shadowColor = color
  this.ctx.shadowBlur = 2
  this.ctx.fill()
  this.ctx.shadowBlur = 0
  this.ctx.font = `normal ${this.r * 0.2}px blod`
  this.ctx.textAlign = "center"
  if(flag)
    this.ctx.fillText(`${(this.data * 100).toFixed(1)}%`, this.center, this.center)
  this.ctx.clip()
  this.ctx.fillStyle = '#ffffff'
  this.ctx.fillText(`${(this.data * 100).toFixed(1)}%`, this.center, this.center)
  this.ctx.restore()
  return this
}
/**
 * 生成三次贝塞尔曲线，用于绘制波纹
 * @param {number} basex 起始点x
 * @param {number} basey 起始点y
 */
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
/**
 * 绘制背景
 */
WaterCahrt.prototype.drawBg  = function() {
  this.ctx.save()
  return this.fillArc(this.center, this.center, this.r, 0, 7, false, '#2323fa')
    .fillArc(this.center, this.center, this.r - 5, 0, 7, false, '#ffffff')
    .fillArc(this.center, this.center, this.r - 10, 0, 7, false, '#eaeaea')
    .clipArc(this.center, this.center, this.r - 10)
}
/**
 * 恢复画笔的上一个状态
 */
WaterCahrt.prototype.restore = function() {
  this.ctx.restore()
  return this
}
/**
 * 按照一个圆形抠图
 * @param {number} x 圆心y
 * @param {number} y 圆心x
 * @param {number} r 圆半径
 */
WaterCahrt.prototype.clipArc = function(x, y, r) {
  this.ctx.beginPath()
  this.ctx.arc(x, y, r, 0, 7, false)
  this.ctx.clip()
  return this
}
/**
 * 按照圆填充指定颜色，参数同arc，只是多了个颜色
 * @param {number} x 
 * @param {number} y 
 * @param {number} r 
 * @param {number} startAngle 
 * @param {number} endAngle 
 * @param {number} flag 
 * @param {string} color 
 */
WaterCahrt.prototype.fillArc = function(x, y, r, startAngle, endAngle, flag, color) {
  this.ctx.beginPath()
  this.ctx.arc(x, y, r, startAngle, endAngle, flag)
  this.ctx.fillStyle = color
  this.ctx.shadowColor = color
  this.ctx.shadowBlur = 2
  this.ctx.shadowOffsetX = 0
  this.ctx.shadowOffsetY = 0
  this.ctx.fill()
  this.ctx.shadowBlur = 0
  return this
}

new WaterCahrt('canvas', 0.586).draw()
