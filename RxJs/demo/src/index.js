console.log('RxJs学习');

import { codeRep } from './codeRepository/index'
import { demoRep } from './demoRepository/index'
import { writeCode, writeStr } from './util/tool'

writeCode(codeRep[1])
demoRep[1]()

document.getElementById('select_demo').onchange = e => {
  let key = e.target.value
  writeStr('', false)
  writeCode(codeRep[key])
  demoRep[key]()
}