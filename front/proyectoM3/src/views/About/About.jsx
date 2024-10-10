import logo from "../../assets/veterinaria.jpg";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={styles.card}>
      <img
        src={logo}
        alt="Logo Veterinaria Buenos Aires"
        className={styles.logo}
      />
      <h2 className={styles.title}>Veterinaria Buenos Aires</h2>
      <p className={styles.description}>
        Con más de 10 años de experiencia en el cuidado y bienestar de tus
        mascotas, ofrecemos un servicio profesional y cálido. Nuestro equipo de
        veterinarios está dedicado a proporcionar la mejor atención para tu fiel
        compañero.
      </p>
    </div>
  );
};

export default About;
