export function writeStr(text, flag = true) {
  let el = document.getElementById('resultStr')
  if(flag) {
    el.textContent = el.textContent + text
  } else {
    el.textContent = text
  }
}

export function writeCode(code) {
  document.getElementById('code').textContent = code
}