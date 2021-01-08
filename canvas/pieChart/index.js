/**
 * 初始化图形
 * @param {string} id canvas的id 
 * @param {Array} data 数据 
 */
function PieChart(id, data) {
  const canvas = document.getElementById(id)
  const context = canvas.getContext('2d')
  // 赋值属性
  this._canvas = canvas
  this._context = context
  // 定义错误信息，在出现错误信息的时候就直接清空画布
  let error = ""
  Object.defineProperty(this, '_error', {
    enumerable: false,
    configurable: false,
    set(val) {
      if (typeof val === 'string' && val !== "") {
        console.error(val)
        error = val
        if(this._clear) this._clear()
      } else {
        error = ""
      }
    },
    get() {
      return error
    }
  })
  this._maxValue = 0
  this._minR = 0
  this._maxR = 0
  this.data = this._mapData(data)
  _bindHover(this)
}
/**
 * 清除画布
 */
PieChart.prototype._clear = function() {
  this._context.fillStyle = '#fafafa'
  this._context.fillRect(0, 0, this._canvas.width, this._canvas.height)
}
/**
 * 获取绘画区域
 */
PieChart.prototype._getChartZone = function() {
  if (this._error) return []
  let R = this._canvas.width > this._canvas.height ? this._canvas.height : this._canvas.width
  if (R < 200) {
    this._error = '绘图区域太小了'
    return []
  }
  return [50, R - 50]
}
/**
 * 绘制南丁格尔玫瑰图
 */
PieChart.prototype.draw = function() {
  if (this._error) return this
  this._clear()
  let chartZone = this._getChartZone()
  if (chartZone == 0) return this
  let center = (chartZone[0] + chartZone[1]) / 2
  this.data.forEach((item, index) => {
      this._context.beginPath()
      this._context.moveTo(center, center)
      this._context.arc(center, center, item.R, item.startAngle, item.startAngle + item.angle, false)
      this._context.closePath()
      this._context.fillStyle = item.color.str
      this._context.fill()
  })
  this._context.beginPath()
  this._context.arc(center, center, this._minR, 0, 2 * Math.PI, false)
  this._context.fillStyle = "#ffffff"
  this._context.fill()
  return this
}
/**
 * 获取扇形区域的两个顶点
 */
PieChart.prototype._mapData = function(data) {
  if (this._error) return data
  let chartZone = this._getChartZone()
  if (chartZone == 0) return []
  let center = (chartZone[0] + chartZone[1]) / 2 //获取图形中心
  let _r = (chartZone[1] - chartZone[0]) / 2 * 0.8
  this._minR = _r / 4 > 20 ? 20 :  _r / 4
  this._maxR = _r
  let count = 0
  let angle = 0
  data.forEach((item) => {
    if (item.value <=0 ) this._error = '数据value值应当为大于0的值'
    if (item.value > this._maxValue) this._maxValue = item.value
    count += item.value
  })
  let _R = Math.sqrt((this._maxR**2 - this._minR**2) * count / this._maxValue + this._minR**2)//参考值
  data = data.map((item, index) => { //格式化数据
    item.percent = item.value / count
    item.startAngle = angle
    item.angle = 2 * Math.PI * item.percent
    angle += 2 * Math.PI * item.percent
    if(!item.color) {//如未给出颜色，则计算颜色
      item.color = _getColor(159, 100, 200, index)
    }
    item.R = Math.sqrt((_R**2 - this._minR**2) * item.percent + this._minR**2) // 计算半径
    return item
  })
  return data
}
/**
 * 根据颜色获取新的颜色值
 * @param {number} R 
 * @param {number} G 
 * @param {number} B 
 * @param {number} idx 
 */
function _getColor(R, G, B, idx) {
  R = (R + idx * 19) % 255
  G = (G + idx * 19) % 255
  B = (B + idx * 47) % 180
  R = R < 125 ? R + 125 : R
  G = G < 125 ? G + 125 : G
  B = B < 90 ? B + 90 : B
  return {R, G, B, A: 1, str: `rgba(${R},${G},${B},1)`}
}
/**
 * 交互
 */
function _bindHover(chart) {
  if (!chart._canvas) return
  chart._canvas.onmousemove = (e) => {
    // console.log(e);
  }
}

let data = [
  {lable: 'A', value: 10},
  {lable: 'B', value: 5},
  {lable: 'C', value: 20},
  {lable: 'D', value: 40},
  {lable: 'E', value: 30},
]

let chart = new PieChart('canvas', data)

chart.draw()