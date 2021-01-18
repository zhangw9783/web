import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="index_page">
      <h1 className="t_c m_t_20"><span className="header">个人学习文档</span></h1>
      <section className="function_aera">
        <div className="function_aera_bg">
          <h2>功能区</h2>
          <Link to="/demo">Demo展示区</Link>
        </div>
      </section>
    </div>
  );
}

export default App;
