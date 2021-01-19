import React from 'react'

export const Compile = (props) => {
  let code = props?.code || ""
  code = "let __result = '';" + code + "return __result;"
  let logs = code.match(/console.log\(.+?\)/g)
  let list = []
  if(logs) {
    for(let item of logs) {
      let origin = item
      item = item.split('(')[1]
      item = item.substr(0, item.length - 1)
      item = '__result+=(' + item +'); __result+="<br/>";'
      list.push({
        origin,
        rp: item
      })
    }
    for(let item of list) {
      code = code.replace(item.origin, item.rp)
    }
  }
  let fn, result
  try {
    //eslint-disable-next-line
    fn = new Function(code ?? "")
    result = fn()
  } catch(e) {
    console.error(e)
  }
  return (
    <div dangerouslySetInnerHTML={{__html:result}}>
    </div>
  )
}