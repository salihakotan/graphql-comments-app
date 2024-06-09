import { Col, Row } from 'antd';
import styles from "./styles.module.css"


import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import NewPost from 'pages/NewPost';
import HeaderMenu from './HeaderMenu';
import Post from 'pages/Post';



function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
      <Col span={14} className={styles.col}>
      <HeaderMenu/>
      <div className={styles.content}>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<NewPost/>}/>
          <Route path="/post/:id" element={<Post/>}/>
 
        </Routes>
      </div>
      

      </Col>
    </Row>
    </div>
  );
}

export default App;
