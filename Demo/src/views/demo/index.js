import React from 'react'
import {
  Link
} from 'react-router-dom'
import './index.css'

export const CodeDemo = () => {
  return (
    <div className="demo_bg">
      <h1 className="t_c no_select">Demo展示区</h1>
      <Link to="/"><span className="link">首页</span></Link>
      <div className="code_earea">
        <section className="editor">
          a
        </section>
        <section className="result">
          b
        </section>
      </div>
    </div>
  );
}