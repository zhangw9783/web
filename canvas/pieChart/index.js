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
  // 定义错误信息，在出现错误信息的时候就直接清空画布（响应式的）
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
  this._minR = 0 // 中间白色圆圈半径
  this._maxR = 0 // 最大半径
  this._cache = [] // 离屏canvas图像存储
  this.data = this._mapData(data) //数据
  this._last = null // 记录上一个选中的区域
  _bindHover(this) // 绑定交互事件
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
    item.color = _getColor(159, 100, 200, index) // 计算一个颜色
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
    let offsetX = e.offsetX
    let offsetY = e.offsetY
    let imageData = chart._context.getImageData(0, 0, chart._canvas.width, chart._canvas.height)
    let rgba = {}
    let base = (offsetY) * imageData.width * 4 + (offsetX) * 4
    rgba.R = imageData.data[base + 0]
    rgba.G = imageData.data[base + 1]
    rgba.B = imageData.data[base + 2]
    rgba.A = imageData.data[base + 3]
    let flag = true
    for(let item of chart.data) {
      let color = item.color
      if (color.R === rgba.R && color.G === rgba.G && color.B === rgba.B) {
        flag = false
        if (chart._cache.length === 0) {
          chart._cache.push(chart._canvas.toDataURL('image/png'))
        }
        if (chart._cache.length === 0 || chart._last !== item.lable) {
          if(chart._last !== item.lable) {
            //确保会先清除后再画
            chart._last = item.lable
            _drawCache(chart, () => {
              _drawLable(chart, item)
            })
          } else {
            _drawLable(chart, item)
          }
        }
        break
      }
    }
    if (flag) {
      if(chart._cache.length > 0) {
        chart._last = null
        _drawCache(chart)
      }
    }
  }
}
/**
 * 绘制离屏存储的图像
 */
function _drawCache(chart, callback) {
  let imageURL = chart._cache[0]
  let img = new Image()
  img.src = imageURL
  img.onload = () => {
    chart._clear()
    chart._context.drawImage(img, 0, 0, chart._canvas.width, chart._canvas.height)
    callback && callback()
  }
}
/**
 * 绘制lable
 */
function _drawLable(chart, item) {
  let chartZone = chart._getChartZone()
    let center = (chartZone[0] + chartZone[1]) / 2
    let x = center + Math.cos(item.startAngle) * item.R
    let y = center + Math.sin(item.startAngle) * item.R
    chart._context.font = 'normal 16px blod'
    let text = `${item.lable}: ${item.value}`
    let width = chart._context.measureText(text).width
    chart._context.beginPath()
    chart._context.moveTo(x, y)
    chart._context.fillStyle = 'rgba(0,0,0,0.6)'
    let x1 = x > center ? chart._maxR + center + 20 : center - chart._maxR - width - 50
    let y1 = y > center ? chart._maxR + center + 24 : center - chart._maxR - 24
    chart._context.fillRect(x1, y1, width + 30, 24) //绘制lable背景
    chart._context.lineTo(x1 > center ? x1 : x1 + width + 30, y1)
    chart._context.strokeStyle = item.color.str
    chart._context.strokeWidth = 4
    chart._context.stroke() // 绘制线条
    chart._context.fillStyle = '#ffffff'
    chart._context.fillText(text, x1 + 15, y1 + 18) // 绘制文字
}
/**
 * 计算一个新的更亮的颜色
 */
function _newColor(color) {
  let r = color.R
  let g = color.G
  let b = color.B
  let min = r
  min = min < g ? min : g
  min = min < b ? min : b
  return `rgba(${r*200/min > 255 ? 255 : r*200/min},${g*200/min > 255 ? 255 : g*200/min},${b*200/min > 255 ? 255 : b*200/min},1)`
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