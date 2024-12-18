import { Link } from "react-router";
import styles from "./navbar.module.scss"

function Navbar() {
    return ( 
        <div className={styles.main}>
            <div className={styles.logo}>Habitify</div>
            <div className={styles.el}>
                <Link to={"/"}>Manage your habits</Link>
            </div>
            <div className={styles.el}>
                <Link to={"/create"}>Develop new habit</Link>
            </div>
            <div className={styles.el}>
                <div className={styles.logout} onClick={() => {window.location.href = "/logout"}}>Log out</div>
            </div>
        </div>
     );
}

export default Navbar;