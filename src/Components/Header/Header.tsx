import { NavLink } from "react-router-dom";
import foto from '../../img/rick.png';

import styles from "./Header.module.css"

const Header = () => {
    return (
        <header className={styles.header_bg}>
            <div className={styles.header}>
                    <a><img src={foto} alt="icone rick" /></a>
                    <nav>
                        <ul>
                            <li><NavLink className={styles.link} to="/" end>Personagens</NavLink></li>
                            <li><NavLink className={styles.link} to="sobre">Sobre</NavLink></li>   
                        </ul>             
                    </nav>
            </div>
        </header>
    );
}
 
export default Header;