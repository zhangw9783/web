import React, { useState } from 'react'
import { CodeRepository } from '../../store/codeStore'

export const Editor = (props) => {
  let keys = Object.keys(CodeRepository)
  let [code, setCode] = useState(CodeRepository[1].code)
  return (
    <>
    <div className="tool_bar">
      <button className="run" defaultValue={1} onClick={()=>props?.run?.(code)}>运行</button>
      <select onChange={(e) => setCode(CodeRepository[e.target.value].code)}>
        {keys.map((item) => <option key={item} value={item}>{CodeRepository[item].name}</option>)}
      </select>
    </div>
    <textarea className="editor_text" value={code} onChange={e=>setCode(e.target.value)}></textarea>
    </>
  )
}