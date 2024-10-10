import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/veterinaria.jpg";
const NavBar = () => {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.logo}>
        <img src={logo} />
      </div>
      <div className={styles.perfiles}>
        <Link to="/home" className={styles.perfil}>Home</Link>
        <Link to="/misTurnos" className={styles.perfil}>Mis Turnos</Link>
        <Link to="/about" className={styles.perfil}>About</Link>
        <Link to="/contact" className={styles.perfil}>Contacto</Link>
      </div>
    </nav>
  );
};

export default NavBar;
