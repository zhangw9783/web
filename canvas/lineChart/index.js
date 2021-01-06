/**
 * 初始化图形
 * @param {string} id canvas的id 
 */
function initChart(id) {
  const canvas = document.getElementById(id)
  const context = canvas.getContext('2d')
  // 用一个颜色做底色
  context.fillStyle = '#fafafa'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#000000'
  // 赋值属性
  this.canvas = canvas
  this.context = context
  this.chartZone = [50, 50, 700, 450]
  this.xAxisLable = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  this.yAxisLable = ['0', '100', '200', '300', '400']
  this.yMax = 400
  this.data = [60, 150, 240, 230, 390, 310, 80]
  this._xLength = (this.chartZone[2] - this.chartZone[0]) * 0.98 
  this._yLength = (this.chartZone[3] - this.chartZone[1]) * 0.98 
  this._xLablePadding = 20
  this.points = null
} 
/**
 * 绘制x轴
 */
initChart.prototype.drawXAxis = function() {
  let gap = this._xLength / this.xAxisLable.length
  let self = this
  //绘制横线
  this.context.moveTo(this.chartZone[0], this.chartZone[3])
  this.context.lineTo(this.chartZone[2], this.chartZone[3])
  this.context.strokeStyle = '#353535'
  this.context.strokeWidth = 4
  this.context.stroke()
  this.xAxisLable.forEach(function (lable, index) {
    self.context.font = '16px'
    self.context.textAlign = 'center'
    self.context.fillText(lable, self.chartZone[0] + (index + 0.5) * gap, self.chartZone[3] + self._xLablePadding, gap)
    self.context.moveTo(self.chartZone[0] + (index + 0.5) * gap, self.chartZone[3] + 10)
    self.context.lineTo(self.chartZone[0] + (index + 0.5) * gap, self.chartZone[3])
    self.context.stroke()
  })
  return this
}
/**
 * 绘制y轴
 */
initChart.prototype.drawYAxis = function() {
  let gap = this._yLength / (this.yAxisLable.length - 1)
  let self = this
  //绘制竖线
  this.context.moveTo(this.chartZone[0], this.chartZone[0])
  this.context.lineTo(this.chartZone[0], this.chartZone[3])
  this.context.strokeStyle = '#353535'
  this.context.strokeWidth = 4
  this.context.stroke()
  this.yAxisLable.forEach(function (lable, index) {
    let offset = self.context.measureText(lable).width
    self.context.font = '16px'
    self.context.fillText(lable, self.chartZone[0] - offset - 10, self.chartZone[3] - index * gap)
    self.context.beginPath()
    self.context.moveTo(self.chartZone[0] - 10, self.chartZone[3] - index * gap)
    self.context.lineTo(self.chartZone[0], self.chartZone[3] - index * gap)
    self.context.stroke()
    if (index !== 0) {
      self.context.setLineDash([8,8])
      self.context.beginPath()
      self.context.strokeWidth = 2
      self.context.strokeStyle = '#aeaeae'
      self.context.moveTo(self.chartZone[0], self.chartZone[3] - index * gap)
      self.context.lineTo(self.chartZone[2], self.chartZone[3] - index * gap)
      self.context.stroke()
      self.context.setLineDash([])
    }
    self.context.strokeStyle = '#353535'
    self.context.strokeWidth = 4
  })
  return this
}
/**
 * 绘制折线图
 */
initChart.prototype.drawLine = function() {
  let self = this
  let gap = this._xLength / this.xAxisLable.length
  this.data.forEach(function(item, index) {
    let y = self.chartZone[3] - item * self._yLength / self.yMax
    let x = self.chartZone[0] + (index + 0.5) * gap
    if (index !== 0) {
      // 如果不是第一个点，则从上一个点绘制到当前点
      self.context.lineTo(x, y)
      self.context.strokeStyle = '#1abc9c'
      self.context.strokeWidth = 4
      self.context.stroke()
    }
    // 绘制一个纵向的辅助线
    self.context.beginPath()
    self.context.moveTo(x, y)
    self.context.lineTo(x, self.chartZone[3])
    self.context.setLineDash([8, 8])
    self.context.strokeStyle = '#aeaeae'
    self.context.strokeWidth = 2
    self.context.stroke()
    self.context.setLineDash([])
    // 绘制一个圆点来标记数据点
    self.context.beginPath()
    self.context.arc(x, y, 5, 0, 2 * Math.PI, false)
    self.context.fillStyle = '#1abc9c'
    self.context.fill()
    // 开始新的路径绘制，将画笔移动到当前点，为绘制到下一个点做准备
    self.context.beginPath()
    self.context.moveTo(x, y)
  })
  return this
}
/**
 * 绘制折线图调用
 */
initChart.prototype.drawLineChart = function() {
  this.drawXAxis().drawYAxis().drawLine()
}
/**
 * 绘制曲线图调用
 */
initChart.prototype.drawBezierChart = function() {
  this.drawXAxis().drawYAxis().drawBezier()
}
/**
 * 绘制一条平滑的曲线
 */
initChart.prototype.drawBezier = function() {
  let bezierPoints = this._getBezierPoints()
  let points = this._getPoints()
  let self = this
  let gap = this._xLength / this.xAxisLable.length
  // 绘制贝塞尔曲线
  this.context.beginPath()
  this.context.moveTo(points[0].x, points[0].y)
  bezierPoints.forEach(function(item) {
    self.context.bezierCurveTo(item.cp1x, item.cp1y, item.cp2x, item.cp2y, item.dx, item.dy)
  })
  self.context.strokeStyle = '#1abc9c'
  self.context.strokeWidth = 4
  self.context.stroke()
  // 绘制辅助点和线
  this.data.forEach(function(item, index) {
    let y = self.chartZone[3] - item * self._yLength / self.yMax
    let x = self.chartZone[0] + (index + 0.5) * gap
    // 绘制一个纵向的辅助线
    self.context.beginPath()
    self.context.moveTo(x, y)
    self.context.lineTo(x, self.chartZone[3])
    self.context.setLineDash([8, 8])
    self.context.strokeStyle = '#aeaeae'
    self.context.strokeWidth = 2
    self.context.stroke()
    self.context.setLineDash([])
    // 绘制一个圆点来标记数据点
    self.context.beginPath()
    self.context.arc(x, y, 5, 0, 2 * Math.PI, false)
    self.context.fillStyle = '#1abc9c'
    self.context.fill()
  })
  return this
}
/**
 * 获取3次贝塞尔曲线的点
 */
initChart.prototype._getBezierPoints = function() {
  let _points = this._getPoints().slice()
  //左右填充一个节点
  let points = [_points[0], ..._points, _points[_points.length - 1]]
  //格式化贝塞尔曲线的点
  let bezierPoints = []
  for (let i = 2; i < points.length - 1; i++) {
    bezierPoints.push({
      dx: points[i].x,
      dy: points[i].y,
      cp1x: points[i-1].x + (points[i].x - points[i-2].x)/6,
      cp1y: points[i-1].y + (points[i].y - points[i-2].y)/6,
      cp2x: points[i].x - (points[i+1].x - points[i-1].x)/6,
      cp2y: points[i].y - (points[i+1].y - points[i-1].y)/6,
    })
  }
  return bezierPoints
}
/**
 * 将数据转化为坐标点
 */
initChart.prototype._getPoints = function() {
  if (this.points !== null)
    return this.points
  let points = []
  let gap = this._xLength / this.xAxisLable.length
  let self = this
  this.data.forEach(function(item, index) {
    let y = self.chartZone[3] - self._yLength * item / self.yMax
    let x = self.chartZone[0] + (index + 0.5) * gap
    points.push({x,y})
  })
  this.points = points
  return this.points
}

let chart = new initChart('canvas')

chart.drawLineChart()
// chart.drawBezierChart()