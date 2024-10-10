import styles from "./Contact.module.css";
import logo from "../../assets/veterinaria.jpg";
const Contact = () => {
  return (
    <div className={styles.card}>
      <img src={logo} alt="Logo Contacto" className={styles.logo} />
      <h2 className={styles.title}>Contacto</h2>
      <div className={styles.contactInfo}>
        <p>
          <strong>Teléfono:</strong> +123 456 7890
        </p>
        <p>
          <strong>Dirección:</strong> Av. de los Bosques 1234, Buenos Aires
        </p>
        <p>
          <strong>Email:</strong> contacto@veterinariabuenosaires.com
        </p>
        <p>
          <strong>Horarios:</strong> Lunes a Viernes, 9:00 - 18:00
        </p>
        <p>
          <strong>Médicos:</strong> Dr. Juan Pérez, Dr. Ana López
        </p>
      </div>
    </div>
  );
};

export default Contact;
