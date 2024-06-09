import { Col, Row } from 'antd';
import styles from "./styles.module.css"


import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import NewPost from 'pages/NewPost';
import HeaderMenu from './HeaderMenu';



function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
      <Col span={14}>
      <HeaderMenu/>
      <div className={styles.content}>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<NewPost/>}/>
 
        </Routes>
      </div>
      

      </Col>
    </Row>
    </div>
  );
}

export default App;
