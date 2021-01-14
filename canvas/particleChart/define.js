// 二维向量定义
function Vector2(x=0, y=0) {
  this.length = 0
  Object.defineProperties(this,{
    x: {
      configurable: false,
      set(val) {
        if (typeof val === 'number' && !isNaN(val)) {
          x = val
          if (typeof this.y === 'number' && !isNaN(this.y)) {
            this.length = Math.sqrt(x**2 + y**2)
          }
        }
      },
      get() {
        return x
      }
    },
    y: {
      configurable: false,
      set(val) {
        if (typeof val === 'number' && !isNaN(val)) {
          y = val
          if (typeof this.x === 'number' && !isNaN(this.x)) {
            this.length = Math.sqrt(x**2 + y**2)
          }
        }
      },
      get() {
        return y
      }
    }
  })
  this.x = x
  this.y = y
}
// 二维向量操作定义
Vector2.prototype.add = function(v=new Vector2(0, 0)) {
  return new Vector2(this.x + v.x, this.y + v.y)
}
Vector2.prototype.reduce = function(v = new Vector2(0, 0)) {
  return new Vector2(this.x - v.x, this.y - v.y)
}
Vector2.prototype.mutiply = function(multiple = 1) {
  return new Vector2(this.x * multiple, this.y * multiple)
}
Vector2.prototype.divide = function(d) {
  if (d === 0) {
    return undefined
  }
  return new Vector2(this.x / d, this.y / d)
}
Vector2.prototype.dot = function(v = new Vector2(0, 0)) {
  return this.x * v.x + this.y * v.y
}
Vector2.prototype.normalize = function() {
  if(this.length === 0) {
    return undefined
  }
  return new Vector2(this.x / this.length, this.y / this.length)
}
Vector2.prototype.copy = function() {
  return new Vector2(this.x, this.y)
}
Vector2.prototype.isEqual = function(v=new Vector2(NaN, NaN)) {
  return this.x === v.x && this.y === v.y
}

// 粒子点定义
function Particle(x = 0, y = 0, r = 1) {
  Object.defineProperties(this, {
    pos0: {
      configurable: false,
      writable: false,
      value: new Vector2(x, y)
    }
  })
  this.r = r
  this.pos1 = new Vector2(x, y)
  this.speed = new Vector2(0, 0)
}

Particle.prototype.update = function(center = new Vector2(0, 0), explodeR = 0, resetDistance = 5, speed = 10, fps=60) {
  let pointPos0 = this.pos0.reduce(this.pos1)
  this.speed = pointPos0.normalize()?.mutiply(speed / fps)
  let nextPos = this.pos1.add(this.speed)
  let pointCenter = this.pos1.reduce(center)
  let nextToPos0 = nextPos.reduce(this.pos0)
  let pos0ToCenter = this.pos0.reduce(center)
  if(pointCenter.length < explodeR) {
    if (pointCenter.length === 0) return
    nextPos = center.add(pointCenter.normalize().mutiply(explodeR).add(pos0ToCenter))
  } else {
    if(nextToPos0.length < resetDistance) {
      nextPos = this.pos0.copy()
    }
    if (nextPos.reduce(center).length < explodeR) {
      nextPos = center.add(pointCenter.normalize().mutiply(explodeR).add(pos0ToCenter))
    }
  }
  this.pos1 = nextPos
}
Particle.prototype.isStart = function() {
  return this.pos0.isEqual(this.pos1)
}