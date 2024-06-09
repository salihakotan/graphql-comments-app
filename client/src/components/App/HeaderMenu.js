import { Menu } from "antd";
import styles from "./styles.module.css"
import { Link,useLocation } from "react-router-dom";

function HeaderMenu() {

    const location = useLocation

  return (
    <Menu theme="dark" selectedKeys={location.pathname} className={styles.headerMenu} mode="horizontal">
        <Menu.Item key="/" className={styles.menuItem}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/new" className={styles.menuItem}>
            <Link to="/new">New</Link>
        </Menu.Item>
    </Menu>
  );
}

export default HeaderMenu;
