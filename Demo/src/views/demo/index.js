import React, { useState } from 'react'
import {
  Link
} from 'react-router-dom'
import { Compile } from './complie'
import { Editor } from './editor'
import './index.css'

export const CodeDemo = () => {
  let [code, setCode] = useState('')
  return (
    <div className="demo_bg">
      <h1 className="t_c no_select">Demo展示区</h1>
      <Link to="/"><span className="link">首页</span></Link>
      <div className="code_earea">
        <section className="editor">
          <Editor run={code=>setCode(code)} />
        </section>
        <section className="result">
          <Compile code={code} />
        </section>
      </div>
    </div>
  );
}