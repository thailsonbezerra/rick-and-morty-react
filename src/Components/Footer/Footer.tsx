import styles from "./Footer.module.css";
import rickFooter from '../../img/rickFooter.png';
import instagram from '../../img/instagram.png'
import github from '../../img/github.png'
import linkedin from '../../img/linkedin.png'


const Footer = () => {

    const SizeIconSocial = '32px'

    return (
        <footer className={styles.footer}>
            <h1>2023<span>RMR</span></h1>
            <img src={rickFooter} alt="icone rick"/>
            <ul className={styles.icons_social}>
                <li><img src={instagram} alt="linkedin" height={SizeIconSocial} width={SizeIconSocial}/></li>
                <li><img src={github} alt="instagram" height={SizeIconSocial} width={SizeIconSocial} /></li>
                <li><img src={linkedin} alt="github"  height={SizeIconSocial} width={SizeIconSocial}/></li>
            </ul>
        </footer>
    );
}
 
export default Footer;