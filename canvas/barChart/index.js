const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

let options = {
  chartZone: [50, 50, 700, 450],
  yAxisLable: ['0', '100', '200', '300', '400'],
  yMax: 400,
  xAxisLable: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  data: [10, 50, 200, 330, 390, 320, 220],
  barStyle: {
    width: 70,
    color: '#1abc9c'
  }
}

drawBarChart(options)

function drawBarChart(options) {
  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#000000'
  drawAxis(options)
  drawYLable(options)
  drawXLable(options)
  // drawData(options)
  drawDataWithGradient(options)
  // let el = document.createElement('a')
  // el.href = canvas.toDataURL("image/jpeg")
  // el.download = '柱状图.jpg'
  // el.click()
}

function drawAxis (options) {
  let chartZone = options.chartZone
  context.strokeWidth = 4
  context.strokeStyle = '#353535'
  context.moveTo(chartZone[0], chartZone[1])
  context.lineTo(chartZone[0], chartZone[3])
  context.lineTo(chartZone[2], chartZone[3])
  context.stroke()
}

function drawYLable (options) {
  let lables = options.yAxisLable
  let yLength = (options.chartZone[3] - options.chartZone[1]) * 0.98
  let gap = yLength / (lables.length - 1)

  lables.forEach(function (lable, index) {
    // 填标签
    let offset = context.measureText(lable).width + 20
    context.strokeStyle = '#eaeaea'
    context.font = '16px'
    context.fillText(lable, options.chartZone[0] - offset, options.chartZone[3] - index * gap)
    // 绘制小间隔
    context.beginPath()
    context.strokeStyle = '#353535'
    context.moveTo(options.chartZone[0] - 10, options.chartZone[3] - index * gap)
    context.lineTo(options.chartZone[0], options.chartZone[3] - index * gap)
    context.stroke()
    // 绘制横向辅助线
    if(index !== 0) {
      context.beginPath()
      context.setLineDash([8, 8])
      context.strokeStyle = '#aeaeae'
      context.strokeWidth = 2
      context.moveTo(options.chartZone[0], options.chartZone[3] - index * gap)
      context.lineTo(options.chartZone[2], options.chartZone[3] - index * gap)
      context.stroke()
      context.setLineDash([])
      context.strokeWidth = 4
    }
  })
}

function drawXLable(options) {
  let lables = options.xAxisLable
  let xLength = (options.chartZone[2] - options.chartZone[0]) * 0.98
  let gap = xLength / (lables.length)

  lables.forEach(function (lable, index){
    // 填充字体
    let offsetX = context.measureText(lable).width / 2
    let offsetY = 26 + options.chartZone[3]
    let indexOffset = (lables.length - index) * gap - gap / 2
    context.strokeStyle = '#eaeaea'
    context.font = '16px'
    context.fillText(lable, options.chartZone[2] - indexOffset - offsetX, offsetY)
    // 绘制小间隔
    context.beginPath()
    context.strokeStyle = '#353535'
    context.moveTo(options.chartZone[2] - indexOffset, options.chartZone[3] + 10)
    context.lineTo(options.chartZone[2] - indexOffset, options.chartZone[3])
    context.stroke()
  }) 
}

function drawData(options) {
  let data = options.data
  let yLength = (options.chartZone[3] - options.chartZone[1]) * 0.98
  let xLength = (options.chartZone[2] - options.chartZone[0]) * 0.98
  let gap = xLength / options.xAxisLable.length

  data.forEach(function(item, index) {
    let x0 = options.chartZone[2] - (options.xAxisLable.length - index) * gap + gap / 2 - options.barStyle.width / 2
    let height = item / options.yMax * yLength
    let y0 = options.chartZone[3] - height
    let width = options.barStyle.width
    context.fillStyle = options.barStyle.color ||'#1abc9c'
    context.fillRect(x0, y0, width, height)
  })
}

function drawDataWithGradient(options) {
  let data = options.data
  let yLength = (options.chartZone[3] - options.chartZone[1]) * 0.98
  let xLength = (options.chartZone[2] - options.chartZone[0]) * 0.98
  let gap = xLength / options.xAxisLable.length
  let fillStyleGradient = context.createLinearGradient((options.chartZone[0]+options.chartZone[2])/2, options.chartZone[1],(options.chartZone[0]+options.chartZone[2])/2, options.chartZone[3])
  fillStyleGradient.addColorStop(0, options.barStyle.color || '#1abc9c')
  fillStyleGradient.addColorStop(1, 'rgba(1, 176, 241, 1)')

  data.forEach(function(item, index) {
    let x0 = options.chartZone[2] - (options.xAxisLable.length - index) * gap + gap / 2 - options.barStyle.width / 2
    let height = item / options.yMax * yLength
    let y0 = options.chartZone[3] - height
    let width = options.barStyle.width
    context.fillStyle = fillStyleGradient
    context.fillRect(x0, y0, width, height)
  })

}