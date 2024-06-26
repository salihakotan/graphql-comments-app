import { Menu } from "antd";
import { Link,useLocation } from "react-router-dom";
import styles from "./styles.module.css"

function HeaderMenu() {

    const location = useLocation

  return (
    <Menu selectedKeys={location.pathname} className={styles.headerMenu} mode="horizontal">
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
