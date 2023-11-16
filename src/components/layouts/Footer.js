import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'; //import dos icones

import styles from './Footer.module.css';

function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.list}>

                <li>
                    <FaFacebook />
                </li>

                <li>
                    <FaInstagram />
                </li>

                <li>
                    <FaLinkedin />
                </li>
            </ul><br/>
            <p className={styles.copy_right}><span >Costs</span> &copy;2023</p > {/*Comandos de exibição copyrights */}
        </footer>
    )
}

export default Footer