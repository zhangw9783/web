function initChart(id) {
  const canvas = document.getElementById(id)
  const context = canvas.getContext('2d')

  context.fillStyle = '#fafafa'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#000000'

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
} 

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

initChart.prototype.drawLine = function() {
  let self = this
  let gap = this._xLength / this.xAxisLable.length
  this.data.forEach(function(item, index) {
    let y = self.chartZone[3] - item * self._yLength / self.yMax
    let x = self.chartZone[0] + (index + 0.5) * gap
    if (index !== 0) {
      self.context.lineTo(x, y)
      self.context.strokeStyle = '#1abc9c'
      self.context.strokeWidth = 4
      self.context.stroke()
    }
    self.context.beginPath()
    self.context.moveTo(x, y)
    self.context.lineTo(x, self.chartZone[3])
    self.context.setLineDash([8, 8])
    self.context.strokeStyle = '#aeaeae'
    self.context.strokeWidth = 2
    self.context.stroke()
    self.context.setLineDash([])
    self.context.beginPath()
    self.context.arc(x, y, 5, 0, 2 * Math.PI, false)
    self.context.fillStyle = '#1abc9c'
    self.context.fill()
    self.context.beginPath()
    self.context.moveTo(x, y)
  })
  
  return this
}

initChart.prototype.drawLineChart = function() {
  this.drawXAxis().drawYAxis().drawLine()
}

let chart = new initChart('canvas')

chart.drawLineChart()