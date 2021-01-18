export function writeStr(text, flag = true) {
  let el = document.getElementById('resultStr')
  if(flag) {
    el.innerHTML = el.innerHTML + text
  } else {
    el.innerHTML = text
  }
}

export function writeLine(text, flag = true) {
  let el = document.getElementById('resultStr')
  if(flag) {
    el.innerHTML = el.innerHTML + `<p>${text}</p>`
  } else {
    el.innerHTML = `<p>${text}</p>`
  }
}

export function writeCode(code) {
  document.getElementById('code').textContent = code
}