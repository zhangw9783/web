const EXPLODE_RADIUS = 40
const SPEED = 200
const FPS = 60
const RESET_DISTANCE = 10
const GAP = 5

const canvas = document.getElementById('root')
const ctx = canvas.getContext('2d')

let particles = []
let explodeCenter = new Vector2(-EXPLODE_RADIUS, 0)

function start() {
  clear()
  createParticles(0, 100, canvas.width, 200)
  drawParticles()
  bindEvent()
  animationStart()
}

function clear(color='#000000') {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function createParticles(x=0, y=0, w=canvas.width, h=canvas.height) {
  let n = h / GAP
  let m = w / GAP
  for (let i = 0; i <= m; i++) {
    let list = []
    for (let j = 0; j <= n; j++) {
      list.push(new Particle(i * GAP + x, j * GAP + y))      
    }    
    particles.push(list)
  }
}

function drawParticles() {
  particles.forEach(item => {
    item.forEach(p => {
      p.update(explodeCenter, EXPLODE_RADIUS, RESET_DISTANCE, SPEED, FPS)
      drawPoint(p, p.isStart() ? '#ffffff' : '#ff0000')
    })
  })
}

function drawPoint(p = new Particle(), color='#ffffff') {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(p.pos1.x, p.pos1.y, p.isStart() ? 1 : 2, 0, 7,false)
  ctx.fill()
}

function bindEvent() {
  canvas.onmousemove = (e) => {
    let x = e.offsetX
    let y = e.offsetY
    explodeCenter = new Vector2(x, y)
  }
  canvas.onmouseout = e => {
    explodeCenter = new Vector2(-EXPLODE_RADIUS, 0)
  }
}

function animationStart() {
  clear()
  drawParticles()
  requestAnimationFrame(animationStart)
}

start()